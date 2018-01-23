
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = function (ctx) {
  let config = {
  }

  if (ctx.env === 'production') {
    config = {
      plugins: [
        require('autoprefixer')({
          browsers: [
            'last 3 version',
            'ie >= 11',
          ],
        }),
        require('cssnano')(
          {
            preset: 'default',
          }
        )
      ]
    }
  }
  return config
}

