
'use strict';

const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const {ConcatSource} = require('webpack-sources');
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
const clientSrc = fs.readFileSync(path.join(__dirname, 'client.js')).toString();
const getPort = require('get-port');

const createClient = data => {
	let src = clientSrc;

	// eslint-disable-next-line guard-for-in
	for (const key in data) {
		src = src.replace('/*' + key + '*/', data[key]);
	}

	return src;
};

const name = 'BrowserReloadPlugin';

class BrowserReloadPlugin {
	constructor(options) {
		this.options = {
			port: 8080,
			retryWait: 5000,
			...options,
		};
	}

	async start() {
		const {options} = this;
		const port = await getPort(options);
		this.wss = new WebSocket.Server({port});
		this.clientSrc = createClient({
			port,
			retryWait: options.retryWait,
		});
	}

	broadcast(message) {
		this.wss.clients.forEach(client => client.send(message));
	}

	apply(compiler) {
		const {options} = this;
		const matchObject = ModuleFilenameHelpers.matchObject.bind(
			undefined,
			{
				include: options.include || /\.js$/,
				exclude: options.exclude,
			},
		);

		compiler.hooks.watchRun.tapPromise(name, async () => {
			if (!this.wss) {
				await this.start();
			}

			this.broadcast('cmd:rebuilding');
		});

		compiler.hooks.done.tap(name, () => this.broadcast('cmd:reload'));

		compiler.hooks.compilation.tap(name, compilation => {
			compilation.hooks.optimizeChunkAssets.tapPromise(name, async chunks => {
				const {clientSrc} = this;

				for (const chunk of chunks) {
					if (!chunk.canBeInitial()) {
						continue;
					}

					for (const file of chunk.files) {
						if (!matchObject(file)) {
							continue;
						}

						compilation.assets[file] = new ConcatSource(
							clientSrc,
							'\n',
							compilation.assets[file],
						);
					}
				}
			});
		});
	}
}

module.exports = BrowserReloadPlugin;
