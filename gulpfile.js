var gulp = require('gulp'),
  cucumber = require('gulp-cucumber'),
  server = require('./src/server');

gulp.task('server', function () {
  server.listen(9000);
});

gulp.task('cucumber', function() {
  server.listen(9001);
  gulp.src('*features/*', { cwd: 'test' })
    .pipe(cucumber({
        steps: '*features/steps/*.js',
        support: '*features/support/*.js'
    }));
});

gulp.task('default', ['server']);

gulp.task('test', ['cucumber']);