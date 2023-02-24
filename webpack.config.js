const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./source/index.tsx'],
  output: {
    filename: '[name].[fullhash].js',
    clean: {
      keep: /\ignored\/dir\//,
    },
  },
  devServer: {
    port: 8080,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'source/components'),
      '@state': resolve(__dirname, 'source/state'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
