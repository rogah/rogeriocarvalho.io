'use strict';

var server = require('./src/server');

var serverInstance = server.listen(process.env.PORT || 3000, function () {

  var host = serverInstance.address().address;
  var port = serverInstance.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
