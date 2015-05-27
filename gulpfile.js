var gulp = require('gulp'),
  rimraf = require('gulp-rimraf'),
  jshint = require('gulp-jshint'),
  beautify = require('gulp-jsbeautifier'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src('./src/dist')
    .pipe(rimraf({force: true}));
});

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', '!./src/dist/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify:js', ['lint'], function() {
  return gulp.src(['./src/**/*.js', '!./src/dist/**/*.js'])
    .pipe(beautify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
    .pipe(gulp.dest('./src'))
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

gulp.task('styles', ['clean'], function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/dist'));
});

gulp.task('server', ['build'], function () {
  return nodemon({ 
    script: './src/app.js',
    ext: 'html js', 
    ignore: ['ignored.js'],
    watch: ['./src', './test'],
    tasks: ['build']
  })
  .on('restart', function () {
    console.log('Server restarted.');
  });
});

gulp.task('build', ['clean', 'lint', 'beautify:js', 'minify:js', 'minify:html', 'styles']);