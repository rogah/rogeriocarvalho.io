module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(['./src/styles/**/*.scss', '!./src/styles/**/_*.scss'])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        includePaths: ['node_modules/foundation-sites/scss']
      }).on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.minifyCss())
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest('./dist'));
  }
};
