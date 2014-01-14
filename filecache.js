'use strict';

// Nodejs libs.
var crypto = require('crypto');

// Internal libs.
var debug = require('./utils/debug');
var file = require('./utils/file');

module.exports = function(req) {

  req.pause();

  readCacheFile(req.uri, function(err, response) {

    if(response) {

      //req.onResponse.apply(this, response);
      //req.emit('complete', response, 'fromcache: ' + body);
      //req.close();

    } else {

      req.on('complete', function(response, body) {

        writeCacheFile(req.uri, response, function(err) {
          if(err) throw new err;
          //req.emit('complete', response, 'fromcache: ' + body);
        });


      })
      req.resume();
    }
  });
}

var writeCacheFile = function (uri, response, cb) {
  var cacheFile = getFilename(uri);
  file.write(cacheFile, response, cb);
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