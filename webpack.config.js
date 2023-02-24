const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
  resolve: {
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
    ],
  },
};
