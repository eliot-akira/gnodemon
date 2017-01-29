const nodemon = require('nodemon')
const cli = require('nodemon/lib/cli')
const expandGlobs = require('./expandGlobs')

module.exports = function gnodemon(settings = {}) {

  if (typeof settings === 'string') {

    settings = settings.trim()

    if (settings.indexOf('node') !== 0) {
      if (settings.indexOf('nodemon') !== 0) {
        settings = 'nodemon ' + settings
      }
      settings = 'node ' + settings
    }

    settings = cli.parse(settings)
  }

  if (settings.watch) {
    settings.watch = expandGlobs(settings.watch)
    if (settings.verbose) console.log('nodemon watching:', settings.watch.map(file =>
      '\n  '+file.replace(/\/$/, '')
    ).join(''))
  }

  settings.env = settings.env || Object.assign({}, process.env)

  // Kill nodemon process on Ctrl/Cmd + C
  process.once('SIGINT', function () {
    process.exit()
  })

  return nodemon(settings)
}
