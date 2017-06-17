'use strict';

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
        es: 'eventsource-polyfill',
        hot: 'webpack-hot-middleware/client?reload=true',
        app: 'client'
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
