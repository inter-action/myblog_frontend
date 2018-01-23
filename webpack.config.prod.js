const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractText = new ExtractTextPlugin('[name].[chunkhash].css')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const workboxPlugin = require('workbox-webpack-plugin');

const dist = config.output.path
module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractText.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
          fallback: 'style-loader',
        })
      },
      {
        test: /\.scss$/,
        use: extractText.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 3 },
            },
            'postcss-loader',
            'resolve-url-loader',
            'sass-loader'
          ],
          fallback: 'style-loader',
        }),
      }
    ]
  },

  plugins: [
    extractText,
    // Split dependencies into a `vendor` file and provide a manifest
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new UglifyJSPlugin({
      parallel: true,
      compress: {
        warnings: false,
        screw_ie8: true
      },
    }),
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      jpegtran: {
        progressive: true,
      },
      pngquant: {
        quality: '60-80'
      }
    }),
    // https://zhuanlan.zhihu.com/p/27980441
    // scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(), 
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new workboxPlugin({
      injectManifest: true,
      globDirectory: dist,
      globPatterns: ['**/*.{png,jpeg,jpg,js,css,svg,woff2}'],
      swDest: path.join(dist, 'sw.js'),
    }),
    new BundleAnalyzerPlugin()
  ]
})
