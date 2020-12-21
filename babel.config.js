module.exports = api => ({
  plugins: api.env("production") ? [] : ["react-hot-loader/babel"],
  presets: ["@babel/preset-env", "@babel/preset-react"]
})
