'use strict';
var path = require('path');

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      entry: {
        // es: 'eventsource-polyfill',
        hot: 'webpack-hot-middleware/client?reload=true',
        app: 'index'
      },
      output: {
        path: path.join(this.appRoot, 'build'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    };
  }

  get env() {
    return 'development';
  }

}

module.exports = WebpackDevConfig;
