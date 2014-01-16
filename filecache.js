'use strict';

// Nodejs libs.
var crypto = require('crypto');

// Internal libs.
var debug = require('./utils/debug');
var file = require('./utils/file');
var http = require('http');

module.exports = function(req) {

  req.pause();

  readCacheFile(req.uri, function(err, response) {

    if(response) {

      req.resume();

    } else {

      req.on('complete', function(response, body) {
        writeFile(req.uri, response, function(err) {
          // TODO handle error earlier it's too late here
          if(err) throw new err;
        });
      });
      req.resume();
    }
  });
}

var writeFile = function (uri, response, cb) {
  debug('FileCache.writeFile');
  var cacheFile = getFilename(uri);
  file.write(cacheFile, JSON.stringify(response), cb);
}

var readCacheFile = function (uri, cb) {
  var cacheFile = getFilename(uri);

  file.exists(cacheFile, function (exists) {
    if(!exists) {
      debug('File dosen\'t exist');
      return cb(null);
    }

    debug('File exists');

    file.read(cacheFile, function(err, content) {
      if(err) {
        return cb(err);
      }

      return cb(null, content);
    })

  });
}

var getFilename = function(uri) {
  var filepath = 'cache/' + uri.hostname + '/' + crypto.createHash('sha1').update(uri.href).digest('hex');

  debug(uri.href);
  debug(filepath);

  return filepath;
}