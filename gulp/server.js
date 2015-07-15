module.exports = function (gulp, plugins) {
  return function () {
    return plugins.nodemon({
        script: './src/server.js',
        ext: 'html js scss css',
        ignore: ['ignored.js'],
        watch: ['gulpfile.js', './src', './test'],
        tasks: ['build']
      })
      .on('restart', function () {
        console.log('Server restarted.');
      });
  }
};
