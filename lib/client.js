/*
 * BrowserReloadPlugin
 *
 * https://www.npmjs.com/package/browser-reload-plugin
 */
(function connect() {
	if (window.__browserReloadPlugin) {
		return;
	}

	function log(message) {
		console.info('%c browser-reload-plugin %c ' + message, 'background:#CB5C0D; padding:2px; border-radius:3px; color:#fff', '');
	}

	window.__browserReloadPlugin = true;
	var socket = new WebSocket('ws://localhost:/*port*/');

	socket.addEventListener('open', function () {
		log('Connected. Waiting for changes.');
	});

	socket.addEventListener('error', function () {
		socket.close();
	});

	socket.addEventListener('close', function () {
		log('Connection closed. Retrying in /*retryWaitFormatted*/s');
		window.__browserReloadPlugin = false;
		setTimeout(connect, /*retryWait*/);
	});

	socket.addEventListener('message', function ({data}) {
		if (data === 'cmd:reload') {
			log('Build completed. Reloading...');
			window.location.reload();
		}

		if (data === 'cmd:rebuilding') {
			log('Rebuilding...');
		}
	});
})();
