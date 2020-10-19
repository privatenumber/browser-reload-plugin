/*
 * BrowserReloadPlugin
 *
 * https://www.npmjs.com/package/browser-reload-plugin
 */
(function () {
	if (window.__browserReloadPlugin) {
		return;
	}

	var config = window.__browserReloadPlugin = {
		enabled: true,
		retryWait: /*retryWait*/,
		wsServer: 'ws://localhost:/*port*/',
	};

	function log(message) {
		console.info('%c browser-reload-plugin ' + (config.enabled ? '' : '(Disabled) '), 'background:#CB5C0D; padding:2px; border-radius:3px; color:#fff', message);
	}

	(function connect() {
		var socket = new WebSocket(config.wsServer);

		socket.addEventListener('open', function () {
			log('Connected. Waiting for changes.');
		});

		socket.addEventListener('error', function () {
			socket.close();
		});

		socket.addEventListener('close', function () {
			log('Connection closed. Retrying in ' + Math.ceil(config.retryWait / 1000) + 's');

			if (config.retryWait) {
				setTimeout(connect, config.retryWait);
			}
		});

		socket.addEventListener('message', function ({data}) {
			if (data === 'cmd:reload') {
				if (config.enabled) {
					log('Build completed. Reloading...');
					window.location.reload();
				} else {
					log('Build completed.');
				}
			}

			if (data === 'cmd:rebuilding') {
				log('Rebuilding...');
			}
		});
	})();
})();
