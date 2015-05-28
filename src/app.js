'use strict';

var path = require('path'),
  express = require('express');

var app = express();

app.get('/about', function (req, res) {
  res.send('About Rogerio Carvalho');
});

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, '../bower_components')));

app.set('port', process.env.PORT || 3000);

module.exports = app;
