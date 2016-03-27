'use strict'

var babel = require('gulp-babel')
var del = require('del')
var gulp = require('gulp')
var named = require('vinyl-named')
var webpack = require('webpack-stream')

// gulp.task('default', () => null)

gulp.task('test:babel', function () {
	var subpipe = require('./index')
	return gulp.src('test-src/index.js')
		.pipe(subpipe(function() { return this.pipe(babel()) }))
		.pipe(gulp.dest('test-build'))
})

gulp.task('test:webpack', function () {
	var subpipe = require('./index')
	return gulp.src('test-src/wp*.js')
		// .pipe(webpack())
		.pipe(subpipe(function() {
			return this
				.pipe(named())
				.pipe(webpack())
		}))
		.pipe(gulp.dest('test-build'))
})

gulp.task('clean', function () { return del('test-build') })
