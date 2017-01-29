const nodemon = require('nodemon')
const expandGlobs = require('./expandGlobs')

module.exports = function gnodemon(options = {}) {

  if (typeof options === 'string') {

    const args = options.split(' ')
    const result = []

    let patterns = []
    let ignoreNext = false

    args.forEach((arg, index) => {

      if (ignoreNext) return ignoreNext = false
      if (arg!=='-w' && arg!=='--watch') return result.push(arg)
      if (!args[index+1]) return

      ignoreNext = true

      expandGlobs(args[index+1])
      .forEach(file => result.push('--watch', file))
    })

    options = result.join(' ')

  } else if (options.watch) {

    options.watch = expandGlobs(options.watch)
  }

  if (options.verbose) console.log('nodemon', options)

  // Kill nodemon process on Ctrl/Cmd + C
  process.once('SIGINT', function () {
    process.exit()
  })

  return nodemon(options)
}
