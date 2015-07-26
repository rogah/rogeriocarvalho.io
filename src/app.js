'use strict';

var path = require('path'),
  compress = require('compression'),
  cors = require('cors'),
  express = require('express'),
  favicon = require('serve-favicon');

var pkg = require('../package.json'),
  version = pkg.version || (new Date().getTime());

var app = express();

app.use(favicon(path.resolve(__dirname, '../dist', 'favicon.svg')));
app.use(compress());
app.use(cors());

app.use(function (req, res, next) {
  res.locals.version = version;
  next();
});

app.set('views', path.resolve(__dirname, 'views'));
app.set('etag', 'strong');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'), {
    maxAge: 31536000000
  });
});

app.get('/about', function (req, res) {
  //res.header("Cache-Control", "public, max-age=" + 31536000000);
  res.render('index');
});

app.use(express.static(path.resolve(__dirname, '../dist'), {
  maxAge: 31536000000
}));

app.set('port', process.env.PORT || 3000);

module.exports = app;
