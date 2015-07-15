module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./gulpfile.js', './src/**/*.js'], {
        base: './'
      })
      .pipe(plugins.jsbeautifier({
        config: '.jsbeautifyrc',
        mode: 'VERIFY_AND_WRITE'
      }))
      .pipe(gulp.dest('./'));
  }
};
