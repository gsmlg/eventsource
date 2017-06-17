/* eslint no-console: "off" */
const webpackConfigs = require('./conf/webpack');
const defaultEnv = 'development';

let env = process.env.NODE_ENV;

const requestedEnv = env || defaultEnv;

let WebpackConfig;

if (webpackConfigs[requestedEnv] !== undefined) {
  WebpackConfig = webpackConfigs[requestedEnv];
} else {
  console.warn(`
      Provided environment "${env}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `);
  WebpackConfig = webpackConfigs[defaultEnv];
}

const loadedInstance = new WebpackConfig();

// Set the global environment
process.env.NODE_ENV = loadedInstance.env;

module.exports = loadedInstance.config;
