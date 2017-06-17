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
      "watch": ["server", "conf"],
      "ignore_watch" : ["node_modules"],
      "watch_options": {
        "followSymlinks": false
      },
      env: {
        NODE_ENV: 'development',
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

  ],
};
