module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./gulpfile.js', './src/**/*.js'])
      .pipe(plugins.cached('lint'))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
  }
};
