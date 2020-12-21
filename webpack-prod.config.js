const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry:  [
    './index.js'
  ],
  mode: 'production',
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
          NODE_ENV: 'production',
          AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY
        }
      })
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules'), 'node_modules']
  },
}
