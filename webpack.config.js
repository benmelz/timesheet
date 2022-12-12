const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

process.env['NODE_ENV'] ??= 'development';

module.exports = () => {
  const isProduction = process.env['NODE_ENV'] === 'production';
  return {
    mode: (isProduction) ? 'production' : 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './index.mjs',
    output: {
      path: path.resolve(__dirname, 'public'),
      clean: true
    },
    module: {
      rules: [
        { test: /\.(js|mjs)$/i, loader: 'babel-loader' },
        { test: /\.(css|scss)$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(ico|svg)/i, type: 'asset/resource' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html.ejs' }),
      new MiniCssExtractPlugin()
    ]
  };
};
