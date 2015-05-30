'use strict';

var path = require('path'),
  express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'about.html'));
});

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, '../bower_components')));

app.set('port', process.env.PORT || 3000);

module.exports = app;
