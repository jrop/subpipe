'use strict'

var through2 = require('through2')

function passthrough() {
	return through2.obj(function (f, enc, done) {
		done(null, f)
	})
}

module.exports = function subpipe(streamCreator) {
	var head = passthrough()
	var tail = streamCreator.call(head, head)

	var tailEnded = false
	tail.on('end', function () { tailEnded = true })


	var stream = through2.obj(function throwaway (file, enc, callback) {
		head.write(file)
		callback() // discard
	}, function flush (callback) {
		var self = this

		if (!tailEnded) {
			// need to wait for tail to end:
			tail.on('end', function () { callback() })
		} else {
			// tail is already ended, so are we:
			callback()
		}

		// kick-off flush:
		head.end()
	})

	tail.on('data', function (data) { stream.push(data) })
	tail.on('error', function (e) { stream.emit('error', e) })

	return stream
}
