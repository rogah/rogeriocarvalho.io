module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('./src/icons/**/*.{png,xml,ico,svg,json}')
      .pipe(plugins.cached('favicon'))
      .pipe(gulp.dest('./dist'));
  }
};
