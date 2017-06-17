'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      entry: {
        app: 'index'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    };
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'production';
  }
}

module.exports = WebpackDistConfig;
