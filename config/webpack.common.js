const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/script/app.js',

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      favicon: './src/img/favicon.png',
      scriptLoading: 'blocking',
    }),
  ],
};
