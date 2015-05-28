'use strict';

var app = require('./app');

var server = app.listen(app.get('port'), function () {
  console.log('Server listening at %s:%s', server.address().address, server.address().port);
});
