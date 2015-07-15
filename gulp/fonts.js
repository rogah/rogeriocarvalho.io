module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('./src/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
  }
};
