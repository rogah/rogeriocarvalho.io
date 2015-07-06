'use strict';

var path = require('path'),
  express = require('express');

var app = express();

var thirtyDays = 2592000000;

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'), {
    maxAge: thirtyDays
  });
});

app.get('/about', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'about.html'), {
    maxAge: thirtyDays
  });
});

app.use(express.static(path.resolve(__dirname, 'dist'), {
  etag: true,
  maxAge: thirtyDays
}));

app.use(express.static(path.resolve(__dirname, '../bower_components'), {
  etag: true,
  maxAge: thirtyDays
}));

app.set('port', process.env.PORT || 3000);

module.exports = app;
