const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'production',
  cache: false,
  context: __dirname,
  entry: '../../../services/init',
  node: {
    __dirname: true
  },
  output: {
	path: __dirname + '/../../../public',
    filename: 'bundle.js'
  },
  optimization: {
    minimize: true,
	minimizer: [
      new UglifyJsPlugin({
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      })
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s?c|sa)ss$/,
        use: [
			{ loader: 'style-loader' },
			{ loader: 'css-loader' },
			{ loader: 'sass-loader', options: { outputStyle: 'expanded' } }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
			{ loader: 'url-loader', options: { limit: 8192 } },
			{ loader: 'img-loader' }
        ]
      },
      { test: /\.woff$/, use: [ { loader: 'url-loader', options: { limit: 65000, mimetype: 'application/font-woff', name: 'public/fonts/[name].[ext]' } } ] },
      { test: /\.woff2$/, use: [ { loader: 'url-loader', options: { limit: 65000, mimetype: 'application/font-woff2', name: 'public/fonts/[name].[ext]' } } ] },
      { test: /\.[ot]tf$/, use: [ { loader: 'url-loader', options: { limit: 65000, mimetype: 'application/octet-stream', name: 'public/fonts/[name].[ext]' } } ] },
      { test: /\.eot$/, use: [ { loader: 'url-loader', options: { limit: 65000, mimetype: 'application/vnd.ms-fontobject', name: 'public/fonts/[name].[ext]' } } ] },

      { test: /\.imba/, use: [ 'imba/loader' ]},
      { test: /\.coffee/, use: [ 'coffee-loader' ]}
    ]
  },
  resolve: {
    extensions: ['.imba', '.js', '.coffee' ]
  }
};
