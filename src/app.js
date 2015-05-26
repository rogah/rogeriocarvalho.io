'use strict';

var path = require('path'),
  express = require('express');

var app = express();

app.get('/about', function (req, res) {
  res.send('About Rogerio Carvalho');
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.set('port', process.env.PORT || 3000);

module.exports = app;

if (!module.parent) {
  var server = app.listen(app.get('port'), function () {
    console.log('Server listening at %s:%s', server.address().address, server.address().port);
  });
}
