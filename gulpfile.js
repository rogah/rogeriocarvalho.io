'use strict';

var gulp = require('gulp'),
  del = require('del'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util'),
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
  bump = require('gulp-bump'),
  nodemon = require('gulp-nodemon');

gulp.task('clean', function (callback) {
  del(['./dist'], {
    force: true
  }, callback);
});

gulp.task('lint', function () {
  return gulp.src(['./gulpfile.js', './src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify:js', ['lint'], function () {
  return gulp.src(['./gulpfile.js', './src/**/*.js'], {
      base: './'
    })
    .pipe(beautify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('browserify', ['clean', 'lint'], function () {
  return browserify({
      entries: './src/app/app.js',
      debug: true
    }).bundle()
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify:html', ['clean'], function () {
  return gulp.src('./src/app/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', ['clean'], function () {
  return gulp.src(['./src/styles/**/*.scss', '!./src/styles/**/_*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss']
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify:jpg', ['clean'], function () {
  return gulp.src('./src/img/**/*.jpg')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('minify:svg', ['clean'], function () {
  return gulp.src('./src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', ['clean'], function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('server', ['build'], function () {
  return nodemon({
      script: './src/server.js',
      ext: 'html js scss css',
      ignore: ['ignored.js'],
      watch: ['gulpfile.js', './src', './test'],
      tasks: ['build']
    })
    .on('restart', function () {
      console.log('Server restarted.');
    });
});

gulp.task('ver:patch', function () {
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('ver:minor', function () {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('ver:major', function () {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'major'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build', [
  'clean',
  'lint',
  'beautify:js',
  'browserify',
  'minify:html',
  'styles',
  'minify:jpg',
  'minify:svg',
  'fonts'
]);
