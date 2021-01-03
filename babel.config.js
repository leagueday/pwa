
function getPluginsForEnv(isProduction) {
  const result = isProduction ? ['@babel/transform-runtime'] : ['react-hot-loader/babel']

  result.push('@babel/plugin-proposal-class-properties')

  return result
}

module.exports = api => ({
  plugins: getPluginsForEnv(!!api.env('production')),
  presets: ['@babel/preset-env', '@babel/preset-react']
})
