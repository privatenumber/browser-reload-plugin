# browser-reload-plugin [![Latest version](https://badgen.net/npm/v/browser-reload-plugin)](https://npm.im/browser-reload-plugin) [![Monthly downloads](https://badgen.net/npm/dm/browser-reload-plugin)](https://npm.im/browser-reload-plugin) [![Install size](https://packagephobia.now.sh/badge?p=browser-reload-plugin)](https://packagephobia.now.sh/result?p=browser-reload-plugin)

Automatically reload the browser page on every Webpack watch build

## 🙋‍♂️ Why?
Manually reloading the browser page after your Webpack watch-build finishes is tedious and can really add up.

Speed up development iterations in environments that don't support [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) with _browser-reload-plugin_.


## 🚀 Install
```sh
npm i -D browser-reload-plugin
```

## 🚦 Quick Setup
All you need is two lines of code to get started with the plugin!

In your development Webpack config:

```diff
+ const BrowserReloadPlugin = require('browser-reload-plugin')

  module.exports = {
    ...,

    plugins: [
+     new BrowserReloadPlugin()
    ]
  }
```

That's it! 🎉 Just run your `watch` command to see it in action.


## 🎛 Browser API
The plugin globally exposes a `__browserReloadPlugin` object that lets you configure the plugin at run-time.

- `enabled` (`true`) - Whether to reload the browser on changes.
- `retryWait` (`retryWait` from plugin options) - How long to wait before re-trying a failed connection on the client-side.
- `wsServer` (`ws://localhost:PORT`) - The WebSocket server address.

You can also reconfigure at run-time by rewriting the object properties. For example:

```js
__browserReloadPlugin.enabled = false;
```


## ⚙️ Options

- `port` (`8080`) - Port to bind the servert to. If unavailable, it falls back to a random available port.
- `retryWait` (`5000`) - How long to wait before re-trying a failed connection on the client-side.
- `include` (`/\.js$/`) - A pattern (`string | RegExp | [string, RegExp]`) to match entry-files to add the client-code to. This is useful if your app has multiple entry-points but you only want the reload client to be added to specific ones.
- `exclude` - A pattern (`string | RegExp | [string, RegExp]`) to exclude certain entry-points.

## 💁‍♀️ FAQ

### Does this work on regular non-watch builds?

No, it's designed specifically for Webpack watch mode.


### Should I use this over [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)?

HMR is far superior to this approach. Only use this plugin when you have a sophisticated application that doesn't work well with HMR but you'd still like to automate browser page reloads on build.


### How is this different from [webpack-livereload-plugin](https://www.npmjs.com/package/webpack-livereload-plugin)?

`webpack-livereload-plugin` requires adding a `<script>` tag to your HTML document in order to make live-reload work. This plugin automatically injects itself to the entry-points of your app, and doesn't require any additional setup apart from adding the plugin to the Webpack configuration. It's also much lighter & faster.
