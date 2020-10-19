# browser-reload-plugin [![Latest version](https://badgen.net/npm/v/browser-reload-plugin)](https://npm.im/browser-reload-plugin) [![Monthly downloads](https://badgen.net/npm/dm/browser-reload-plugin)](https://npm.im/browser-reload-plugin) [![Install size](https://packagephobia.now.sh/badge?p=browser-reload-plugin)](https://packagephobia.now.sh/result?p=browser-reload-plugin)

Automatically reload the browser page on every Webpack watch build

## 🙋‍♂️ Why?
- **🔥 Automatic browser reloads** Speed up development by auto-reloading as soon as your build completes!
- **⚡️ Quick setup** All you need is two lines of code to add the plugin!
- **🔌 Auto Reconnects** Automatically reconnects when restarting the watch!

## 🚀 Install
```sh
npm i -D browser-reload-plugin
```

## 🚦 Quick Setup
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

## ⚙️ Options

- `port` (`8080`) - Port to bind the servert to. If unavailable, it falls back to a random available port.
- `retryWait` (`5000`) - How long to wait before trying a failed connection on the client-side.

## 💁‍♀️ FAQ

### Does this work on regular builds?

No, it's designed specifically for Webpack watch mode.


### Should I use this over [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)?

No, HMR is far superior to this approach. Only use this plugin when you have a sophisticated application that doesn't work well with HMR but you'd still like to automate browser page reloads on build.


### How is this different from [webpack-livereload-plugin](https://www.npmjs.com/package/webpack-livereload-plugin)?

`webpack-livereload-plugin` requires adding a `<script>` tag to your HTML document in order to make live-reload work. This plugin automatically injects itself to the entry-points of your app, and doesn't require any additional setup apart from adding the plugin to the Webpack configuration. It's also much lighter & faster.
