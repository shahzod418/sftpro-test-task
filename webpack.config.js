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
    historyApiFallback: true,
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
      '@components': resolve(__dirname, 'source/app/components'),
      '@pages': resolve(__dirname, 'source/app/pages'),
      '@state': resolve(__dirname, 'source/state'),
      '@interfaces': resolve(__dirname, 'source/interfaces'),
      '@hooks': resolve(__dirname, 'source/hooks'),
      '@constants': resolve('source/constants'),
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
        oneOf: [
          {
            test: /\.m\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true },
              },
              { loader: 'sass-loader', options: { sourceMap: false } },
            ],
          },
          { use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
        ],
      },
    ],
  },
};
