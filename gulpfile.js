'use strict';

var gulp = require('gulp'),
  rimraf = require('gulp-rimraf'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  beautify = require('gulp-jsbeautifier'),
  ngAnnotate = require('gulp-ng-annotate'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  svgmin = require('gulp-svgmin'),
  imagemin = require('gulp-imagemin'),
  nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src('./src/dist')
    .pipe(rimraf({force: true}));
});

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', '!./src/dist/**/*.js', '!./src/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify:js', ['lint'], function() {
  return gulp.src(['./src/**/*.js', '!./src/dist/**/*.js', '!./src/scripts/**/*.js'])
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
    .pipe(sass({
      includePaths: ['bower_components/foundation/scss']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/dist'));
});

gulp.task('minify:jpg', ['clean'], function () {
  gulp.src('./src/img/**/*.jpg')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./src/dist/img'));
});

gulp.task('minify:svg', ['clean'], function () {
  gulp.src('./src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./src/dist/img'));
});

gulp.task('fonts', ['clean'], function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./src/dist/fonts'));
});

gulp.task('server', ['build'], function () {
  return nodemon({ 
    script: './src/server.js',
    ext: 'html js scss css', 
    ignore: ['ignored.js'],
    watch: ['./src', './test'],
    tasks: ['build']
  })
  .on('restart', function () {
    console.log('Server restarted.');
  });
});

gulp.task('build', [
  'clean', 
  'lint', 
  'beautify:js', 
  'minify:js',
  'minify:html', 
  'styles',
  'minify:jpg',
  'minify:svg',
  'fonts']);