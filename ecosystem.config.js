let args = process.argv;

let watch = ["server", "conf"];

if (args.includes('production')) {
  watch = false;
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'monitor',
      script    : 'server/index.js',
      "watch": watch,
      "ignore_watch" : ["node_modules"],
      "watch_options": {
        "followSymlinks": false
      },
      env: {
        APP_PORT: 3000,
        NODE_ENV: 'development',
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        APP_PORT: 10251,
        NODE_ENV: 'production'
      }
    },

  ],
};
