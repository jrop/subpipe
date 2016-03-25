'use strict'

var through2 = require('through2')

module.exports = function subpipe(callback) {
	var head = through2.obj(function (f, enc, done) { done(null, f) }) // noop
	var tail = callback.call(head, head)

	return through2.obj(function (obj, enc, callback) {
		// First, make sure we only call `callback` once
		var _done = false
		function done(e, res) {
			if (_done) { return }
			_done = true
			callback(e, res)
		}

		// wait for data to go through the streams:
		tail.on('error', function (e) { done(e) })
		tail.on('data', function (data) { done(null, data) })
		tail.on('end', function () { done() })

		// kick-off:
		head.end(obj)
	})
}
