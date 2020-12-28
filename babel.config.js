module.exports = api => ({
  plugins: api.env("production") ? ["@babel/transform-runtime"] : ["react-hot-loader/babel"],
  presets: ["@babel/preset-env", "@babel/preset-react"]
})
