// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    httpsPort:8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/center': {		// 用户中心反向代理设置
		    target: 'http://192.168.1.210:8083',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/center': '/'}
		  },
      '/auc': {		// auc反向代理设置
		    target: 'http://localhost:8883',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/auc': '/'}
		  },
      '/outside': {		// 外部系统
		    target: 'http://192.168.1.210:8885',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/outside': '/'}
		  }

    },
    cssSourceMap: false
  },
	pro: {
    env: require('./dev.env'),
    httpsPort:8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/center': {		// 用户中心反向代理设置
		    target: 'http://localhost:8083',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/center': '/'}
		  },
      '/auc': {		// auc反向代理设置
		    target: 'http://localhost:8883',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/auc': '/'}
		  },
      '/outside': {		// 外部系统
		    target: 'http://localhost:8885',
		    changeOrigin: true,
        secure:false,
		    pathRewrite: {'^/outside': '/'}
		  }
    },
    cssSourceMap: false,
		inline: false
	}
}
