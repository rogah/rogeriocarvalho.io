'use strict';

var path = require('path'),
  cors = require('cors'),
  express = require('express');

var app = express();

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'), {
    maxAge: 31536000000
  });
});

app.get('/about', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'about.html'), {
    maxAge: 31536000000
  });
});

app.use(express.static(path.resolve(__dirname, 'dist'), {
  etag: true,
  maxAge: 31536000000
}));

app.use(express.static(path.resolve(__dirname, '../bower_components'), {
  etag: true,
  maxAge: 31536000000
}));

app.set('port', process.env.PORT || 3000);

module.exports = app;
