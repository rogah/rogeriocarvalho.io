var browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

module.exports = function (gulp, plugins) {
  return function () {
    return browserify({
        entries: './src/app/app.js',
        debug: true
      }).bundle()
      .pipe(source('app.bundle.js'))
      .pipe(buffer())
      //.pipe(plugins.sourcemaps.init())
      .pipe(plugins.ngAnnotate())
      //.pipe(plugins.uglify())
      .on('error', plugins.util.log)
      //.pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest('./dist'));
  }
}
