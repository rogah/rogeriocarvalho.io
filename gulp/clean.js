var del = require('del');

module.exports = function (gulp, plugins) {
  return function (done) {
    del(['./dist'], {
      force: true
    }, done);
  };
};
