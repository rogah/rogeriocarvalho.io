var gulp = require('gulp'),
  rimraf = require('gulp-rimraf'),
  jshint = require('gulp-jshint'),
  beautify = require('gulp-jsbeautifier'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src('./src/dist')
    .pipe(rimraf({force: true}));
});

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify:js', ['lint'], function() {
  return gulp.src('./src/**/*.js')
    .pipe(beautify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest('./src/'))
});

gulp.task('minify:js', ['clean'], function () {
  return gulp.src(['./src/app/app.js', './src/app/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./src/dist'))
});

gulp.task('minify:html', ['clean'], function () {
  return gulp.src('./src/app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./src/dist'));
});

gulp.task('server', ['build'], function () {
  nodemon({ 
    script: './src/app.js',
    ext: 'html js', 
    ignore: ['ignored.js'],
    watch: ['./src', './test']
  })
  .on('change', ['lint', 'test'])
  .on('restart', function () {
    console.log('Server restarted.');
  });
});

gulp.task('build', ['clean', 'lint', 'beautify:js', 'minify:js', 'minify:html']);