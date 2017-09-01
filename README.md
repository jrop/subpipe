subpipe
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/jrop/subpipe.svg)](https://greenkeeper.io/)

A utility for creating reusable sub-pipes, designed especially for use with Gulp.

## Installation

```sh
npm install --save-dev subpipe
```

## Use

```js
var subpipe = require('subpipe')
function processJavascript() {
	return subpipe(function pipeCreator() {
		//
		// Create the pipeline: note that the following
		// `return` is absolutely necessary:
		//
		return this.pipe(babel())
			.pipe(uglify())
	})
}

gulp.task('js', function () {
	return gulp.src('**/*.js')
		.pipe(processJavascript())
})
```

Or if you are using a lambda:

```js
subpipe(_ => _
	.pipe(babel())
	.pipe(uglify()))
// => creates a new stream you can pipe to
```

## License

ISC License (ISC)
Copyright (c) 2016, Jonathan Apodaca <jrapodaca@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
