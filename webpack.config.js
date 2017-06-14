var path = require('path');
var rootPath = path.resolve(path.join(__dirname));
var client = path.resolve(path.join(rootPath, 'client'));
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJSPlugin = webpack.optimize.UglifyJsPlugin;
var autoprefixer = require('autoprefixer');
var scssSyntaz = require('postcss-scss');

module.exports = function() {
  return {
    entry: {
      hot: 'webpack-hot-middleware/client?reload=true',
      app: client + '/index.js'
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules|bower_components|raphael\.js/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  'syntax-dynamic-import',
                  "transform-es3-property-literals",
                  "transform-es3-member-expression-literals",
                  'transform-runtime',
                  'transform-proto-to-assign',
                  'transform-class-properties',
                  ['transform-es2015-classes', {loose: true}],
                  ["transform-es2015-modules-commonjs", {loose: true}],
                ],
                presets: [
                  'react',
                  ['es2015', {loose: true}],
                  'stage-3'
                ]
              }
            },
          ]
        },
        {
          test: /[\\\/]raphael\.js$/,
          use: [
            {
              loader: "imports-loader",
              options: {
                "this": ">window",
                "define": ">false"
              }
            },
            {
              loader: "exports-loader",
              options: {
                "window.Raphael": true
              }
            }
          ]
        },
        {
          test: /\.ejs$/,
          use: [
            "tpl-loader"
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  plugins: function() {
                    return [
                      autoprefixer({
                        browsers: [
                          "> 1%",
                          "IE >= 8"
                        ]
                      })
                    ];
                  }
                }
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true,
                  syntax: 'postcss-scss',
                  plugins: function() {
                    return [
                      autoprefixer({
                        browsers: [
                          "> 1%",
                          "IE >= 8"
                        ]
                      })
                    ];
                  }
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 24 * 1024
              }
            }
          ]
        },
        {
          test: /\.(mp4|ogg|svg)(\?.*)?$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    devtool: 'source-map',
    output: {
      path: rootPath + '/public',
      publicPath: "/",
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
    },
    resolveLoader: {
      modules: ['node_modules'],
      alias: {
        'tpl-loader': __dirname + '/tpl-loader'
      }
    },
    resolve: {
      modules: [
        client,
        rootPath + "/node_modules"
      ],
      alias: {
      }
    },
    plugins: [
      new HtmlPlugin({
        template: client + '/index.html'
      }),
      new ExtractTextPlugin('[name]-[hash].css'),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: {removeAll: true },
          autoprefixer: {
            browsers: [
              "> 1%",
              "IE >= 8"
            ]
          }
        },
        canPrint: true
      }),
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        '_': 'underscore',
        'moment': 'moment',
        'React': 'react'
      }),
      new webpack.DefinePlugin({
        'DEBUG': JSON.stringify(false),
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production'
      }),
      new webpack.HotModuleReplacementPlugin(),
      /*new UglifyJSPlugin({
        compress: {
          dead_code: true,
          warnings: false,
          screw_ie8: false,
          drop_console: true,
        },
        mangle: {
          screw_ie8: false,
        },
        sourceMap: true,
        comments: false,
        output: {
          screw_ie8: false,
        },
      }),*/
    ]
  };
};
