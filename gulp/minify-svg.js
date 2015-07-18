module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('./src/images/**/*.svg')
      .pipe(plugins.cached('minify:svg'))
      .pipe(plugins.svgmin())
      .pipe(plugins.rename(function (path) {
        path.basename += ".min";
      }))
      .pipe(gulp.dest('./dist/images'));
  }
};
