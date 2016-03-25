import through2 from 'through2'

module.exports = function subpipe(callback) {
	// const head = new PassThrough({ objectMode: true })
	const head = through2.obj((f, enc, done) => done(null, f))
	const tail = callback.call(head, head)

	return through2.obj(function (obj, enc, callback) {
		let _done = false
		function done(e, res) {
			if (_done) { return }
			_done = true
			callback(e, res)
		}

		tail.on('error', e => done(e))
		tail.on('data', data => done(null, data))
		tail.on('end', () => done())

		head.end(obj)
	})
}
