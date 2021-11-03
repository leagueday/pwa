const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devServer: {
    // contentBase: '/dist',
    historyApiFallback: true,
    hot: true,
    port: 3000,
    // publicPath: '/',
    // writeToDisk: true,
  },
  devtool: 'inline-cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: ['svg-react-loader'],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/img', to: 'img' }, 'public/manifest.json'],
    }),
    new webpack.DefinePlugin({
      AIRTABLE_API_KEY: JSON.stringify(process.env.REACT_APP_AIRTABLE_API_KEY),
      NODE_ENV: JSON.stringify('development'),
      'process.env': JSON.stringify({}),
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin() // uncomment for bundle size view
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}
