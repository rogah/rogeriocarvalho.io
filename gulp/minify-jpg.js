module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('./src/img/**/*.jpg')
      .pipe(plugins.imagemin({
        progressive: true
      }))
      .pipe(plugins.rename(function (path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest('./dist/img'));
  }
};