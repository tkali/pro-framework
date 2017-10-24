const path = require('path');
module.exports = {
  context: __dirname,
  entry: '../../../services/init',
  node: {
    __dirname: true
  },
  output: {
	path: __dirname + '/../../../public',
    filename: 'bundle.js'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
			{ loader: 'style-loader' },
			{ loader: 'css-loader' },
			{ loader: 'autoprefixer-loader', options: { browsers: 'last 3 versions' } },
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
