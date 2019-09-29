require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.pro.conf')

const https = require('https');
const fs = require('fs');
var privateKey  = fs.readFileSync(path.join(__dirname, './cert/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './cert/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

// default port where dev server listens for incoming traffic
var httpsPort = process.env.httpsPort || config.dev.httpsPort;
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.pro.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.pro.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)


// serve pure static assets
var staticPath = path.posix.join(config.pro.assetsPublicPath, config.pro.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'https://localhost:' + httpsPort

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
}).catch(new Function());

console.log('> Starting pro server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(httpsPort, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', httpsPort);
});


module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
