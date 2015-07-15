module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('./src/app/**/*.html')
      .pipe(plugins.htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest('./dist'));
  }
};
