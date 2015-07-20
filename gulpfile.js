'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
gulp.task('js:lint', function() {
  return gulp.src(['./gulpfile.js', './tests.js', './assets/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('js:test', function() {
  var mochaPhantomJS = require('gulp-mocha-phantomjs');
  return gulp.src('./test.html')
    .pipe(mochaPhantomJS());
});
gulp.task('default', ['js:lint', 'js:test']);
