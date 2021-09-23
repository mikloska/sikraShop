import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const path = require('path');

// module.exports = {
  export default {
  entry: ["@babel/polyfill",'./client/src/index.js'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sikra Shop',
      template: './index.html',
    }),
  ],
  resolve: {
    // fallback: { "path": false },
    // fallback: { "http": require.resolve("stream-http") },
    extensions: ['.js', '.jsx'],
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/build/',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
};