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
    contentBase: '/dist',
    hot: true,
    port: 3000,
    publicPath: '/',
    writeToDisk: true,
  },
  devtool: 'inline-cheap-module-source-map',
  entry:  [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin({
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'public', 'index.html')
    }),
    new CopyPlugin({
      patterns: [
        {from: 'public/img', to: 'img'},
        'public/manifest.json'
      ],
    }),
    new webpack.DefinePlugin({
      'process': JSON.stringify({
        env: {
          NODE_ENV: 'development',
          AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY
        }
      })
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin() // uncomment for bundle size view
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}
