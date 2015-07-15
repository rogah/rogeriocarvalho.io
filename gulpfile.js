'use strict';

var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

function getTask(task) {
  return require('./gulp/' + task)(gulp, plugins);
}

gulp.task('clean', getTask('clean'));
gulp.task('lint', getTask('lint'));
gulp.task('beautify:js', ['lint'], getTask('beautify'));
gulp.task('browserify', ['clean', 'lint'], getTask('browserify'));
gulp.task('minify:html', ['clean'], getTask('minify-html'));
gulp.task('styles', ['clean'], getTask('styles'));
gulp.task('minify:jpg', ['clean'], getTask('minify-jpg'));
gulp.task('minify:svg', ['clean'], getTask('minify-svg'));
gulp.task('fonts', ['clean'], getTask('fonts'));
gulp.task('ver:patch', getTask('ver-patch'));
gulp.task('ver:minor', getTask('ver-minor'));
gulp.task('ver:major', getTask('ver-major'));

gulp.task('server', ['build'], getTask('server'));

gulp.task('build', [
  'clean',
  'lint',
  'beautify:js',
  'browserify',
  'minify:html',
  'styles',
  'minify:jpg',
  'minify:svg',
  'fonts'
]);
