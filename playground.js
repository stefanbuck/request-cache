'use strict';

var getResource = require('./index');
var debug = require('./utils/debug');

var obj = {
  uri: 'http://registry.npmjs.org/',
  useCache: true
}

getResource(obj, function(error, response, body) {


  debug('RESPONSE statusCode: ' + response.statusCode )

})
