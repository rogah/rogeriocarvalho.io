module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./gulpfile.js', './src/**/*.js'])
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));
  }
};
