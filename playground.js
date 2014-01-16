'use strict';

var getResource = require('./index');
var debug = require('./utils/debug');
var fileCacheStore = require('./filecache');

var obj = {
  uri: 'http://registry.npmjs.org/needto',
  cacheStore: fileCacheStore
}

getResource(obj, function(error, response, body) {


  debug('<<<<<<<<<<<<<<<<<')
  debug('error: ' + error)
  debug('statusCode: ' + response.statusCode );
  debug('body: ' + body );

})
