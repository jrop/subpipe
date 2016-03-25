'use strict'

module.exports = function subpipe(head) {
	var tail = head
	var _pipeNext = head.pipe.bind(head)

	head.pipe = function (dest) {
		tail = _pipeNext(dest)
		_pipeNext = tail.pipe.bind(tail)
		return head
	}

	return head
}
