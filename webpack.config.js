const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (process.env.NODE_ENV === 'production') ?
      '[name].[contenthash].js' :
      '[name].js',
    chunkFilename: (process.env.NODE_ENV === 'production') ?
      '[id].[contenthash].js' :
      '[id].js',
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {from: './src/robots.txt', to: 'robots.txt'},
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: (process.env.NODE_ENV === 'production') ?
        '[name].[contenthash].css' :
        '[name].css',
      chunkFilename: (process.env.NODE_ENV === 'production') ?
        '[id].[contenthash].css' :
        '[id].css',
    }),
    (process.env.NODE_ENV === 'production') ?
      new WorkboxWebpackPlugin.GenerateSW() :
      undefined,
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico|json)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
