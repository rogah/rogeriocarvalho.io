'use strict';

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  jshint = require('gulp-jshint'),
  beautify = require('gulp-jsbeautifier'),
  cucumber = require('gulp-cucumber'),
  nodemon = require('gulp-nodemon');

gulp.task('default', ['server', 'test']);
gulp.task('build', ['lint', 'beautify:js', 'beautify:html']);
gulp.task('test', ['cucumber']);
gulp.task('deploy', ['build', 'clean', 'copy']);

/**
 * path globs / expressions for targets below
 */

var paths = {
  root: './',
  source: './src/',
  public: './src/public/',
  build: './build/',
  files: {
    source: './src/**/*'
  },
  scripts: {
    all: ['./**/*.js', '!./node_modules/**', '!./build/**'],
    source: './src/**/*.js',
    test: './test/**/*.js'
  },
  pages: {
    public: './src/public/**/*.html'
  }
};

//clean build directory
gulp.task('clean', function () {
  return gulp.src(paths.build, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});

// lint all js source files
gulp.task('lint', function () {
  return gulp.src(paths.scripts.all)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// beautify all js files
gulp.task('beautify:js', ['lint'], function () {
  return gulp.src(paths.scripts.all)
    .pipe(beautify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest(paths.root));
});

// beautify all html public files
gulp.task('beautify:html', function () {
  return gulp.src(paths.pages.public)
    .pipe(beautify({
      indentSize: 2
    }))
    .pipe(gulp.dest(paths.public));
});

// cucumber acceptance tests
gulp.task('cucumber', function () {
  return gulp.src('test/features/*')
    .pipe(cucumber({
      steps: 'test/features/steps/*.js',
      support: 'test/features/support/*.js'
    }));
});

// start nodemon server for development
gulp.task('server', ['build'], function () {
  return nodemon({
      script: 'src/app.js',
      ext: 'js html',
      watch: ['./src', './test']
    })
    .on('change', ['lint', 'test'])
    .on('restart', function () {
      console.log('Server restarted.');
    });
});

gulp.task('copy', ['clean', 'build'], function () {
  return gulp.src(paths.files.source)
    .pipe(gulp.dest(paths.build));
});
