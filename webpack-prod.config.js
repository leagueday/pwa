const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['./index.js'],
  mode: 'production',
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
    filename: '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/img', to: 'img' },
        'public/manifest.json',
        'public/img/favicon.ico',
      ],
    }),
    new webpack.DefinePlugin({
      AIRTABLE_API_KEY: JSON.stringify(process.env.AIRTABLE_API_KEY),
      NODE_ENV: JSON.stringify('production'),
      'process.env': JSON.stringify({}),
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: '0.0.1',
      org: 'leagueday',
      project: 'leagueday',
      include: '.',
      ignore: [
        'node_modules',
        'webpack-dev.config.js',
        'webpack-prod.config.js',
      ],
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
  },
}
