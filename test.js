'use strict'

const assert = require('assert')
const subpipe = require('./index')
const through2 = require('through2')

//
// Passthrough stream
//
function noop() {
	return through2.obj(function (s, enc, cb) {
		cb(null, s)
	})
}

//
// Adds a suffix to elements of a stream,
// passing them along immediately
//
function immediateStream(suffix) {
	return through2.obj(function (s, enc, cb) {
		cb(null, s + suffix)
	})
}

//
// Adds a suffix to elements of a stream,
// queueing them to be pushed until the end 'flush'
//
function flushingStream(suffix) {
	const arr = [ ]
	return through2.obj(function (s, enc, cb) {
		arr.push(s + suffix)
		cb(null) // throw away
	}, function (cb) {
		for (const a of arr)
			this.push(a)
		cb()
	})
}

describe('subpipe', function () {
	it('should work with immediate-mode streams', function (done) {
		const stream = noop()
			.pipe(subpipe(_ => _
				.pipe(noop())
				.pipe(immediateStream('1'))
				.pipe(immediateStream('2'))))

		stream.on('data', function (data) {
			const err = data != '12' ? new Error('Unexpected value') : null
			done(err)
		})
		stream.write('')
	})

	it('should work with flushing streams', function (done) {
		const stream = noop()
			.pipe(subpipe(_ => _
				.pipe(noop())
				.pipe(flushingStream('1'))
				.pipe(flushingStream('2'))))

		stream.on('data', function (data) {
			const err = data != '12' ? new Error('Unexpected value') : null
			done(err)
		})
		stream.write('')
		stream.end()
	})
})
