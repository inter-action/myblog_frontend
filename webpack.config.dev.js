let webpack = require('webpack')
let merge = require('webpack-merge')

let config = require('./webpack.config')

module.exports = merge(config, {
  entry: ['react-hot-loader/patch', './src/dev'],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        // resolve url loader's order is important
        use: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './build',
    open: true,

    historyApiFallback: true,
    hot: true,
    inline: true,
    overlay: true, // display error msg right in the browser's view
    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT,

    proxy: [
      {
        context: ['/images', '/api'],
        target: 'http://localhost:5000'
      }
    ]
  }
})
