
# gnodemon

nodemon with glob watch

## Usage

On command line: note that globs must be quoted

```bash
gnodemon src/server/index.js -w 'src/**/server/*.js'
```

As module

```bash
const gnodemon = require('gnodemon')

gnodemon({
  script: 'index.js',
  watch: [
    'src/**/server/*.js'
  ]
})
```
