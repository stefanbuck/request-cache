'use strict';


// Nodejs libs.
var path = require('path');

// External libs.
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');



var file = {};

file.mkdir = function(path, cb) {
  mkdirp(path, cb);
}

file.write = function(writePath, content, cb) {

  file.mkdir(path.dirname(writePath), function(err) {
    if(err) return cb(err);

    fs.writeFile(writePath, content, function(err){
      if(err) return cb(err);

      cb(null);
    });
  });
}

file.read = function(filepath, cb) {
  try {
    fs.readFile(filepath, function(err, content) {
      if(err) return cb(err);

      return cb(null, content);
    });
  }catch(err) {
    cb(err);
  }
}

file.exists = function(filepath, cb) {
  return fs.exists(filepath, cb);
};

module.exports = file;