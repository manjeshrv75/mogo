const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },

  mode: 'development',

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    before: function (app, server) {
      server._watch('./src/**/*.html');
    },
    port: 8000,
    hot: true,
    host: '0.0.0.0',
  },
});
