'use strict';

// Nodejs libs.
var util = require('util');

// External libs.
var request = require('request');

// Internal libs.
var debug = require('./utils/debug');
var file = require('./utils/file');
var filecache = require('./filecache');


var RequestCache = function () {
  debug('constructor')
  request.apply(this, arguments);
};

util.inherits(RequestCache, request);

RequestCache.prototype.init = function (options) {

  debug('init')

  if(options.useCache) {
    filecache(req);
  }

  request.prototype.init.call(this, options)
}

module.exports = RequestCache;