const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'public', 'index.html')
  }),
  new CopyPlugin({
    patterns: [
      { from: 'src/public/img', to: 'img' },
      'src/public/manifest.json'
    ],
  }),
]

if (process.env.NODE_ENV === 'development') {
  ([
    new webpack.HotModuleReplacementPlugin()
  ]).forEach(
    devPlugin => {
      plugins.push(devPlugin)
    }
  )
}

plugins.push(
  new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true,
  })
)

module.exports = {
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
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins,
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
    port: 3000,
    writeToDisk: true,
  },
}
