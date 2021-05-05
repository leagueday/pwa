function getPluginsForEnv(isProduction) {
  const result = ['@babel/transform-runtime']

  if (!isProduction) {
    result.push('react-hot-loader/babel')
  }

  result.push('@babel/plugin-proposal-class-properties')

  return result
}

module.exports = api => ({
  plugins: getPluginsForEnv(!!api.env('production')),
  presets: ['@babel/preset-env', '@babel/preset-react'],
})
