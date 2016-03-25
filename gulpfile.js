'use strict'

const babel = require('gulp-babel')
const del = require('del')
const gulp = require('gulp')
const named = require('vinyl-named')
const webpack = require('webpack-stream')

// gulp.task('default', () => null)

gulp.task('test:babel', function () {
	const subpipe = require('./index')
	return gulp.src('test-src/index.js')
		.pipe(subpipe(_ => _.pipe(babel())))
		.pipe(gulp.dest('test-build'))
})

gulp.task('test:webpack', function () {
	const subpipe = require('./index')
	return gulp.src('test-src/wp*.js')
		// .pipe(webpack())
		.pipe(subpipe(_ => _
			.pipe(named())
			.pipe(webpack())))
		.pipe(gulp.dest('test-build'))
})

gulp.task('clean', () => del('test-build'))
