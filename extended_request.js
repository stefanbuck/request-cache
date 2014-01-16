'use strict';

// Nodejs libs.
var util = require('util');

// External libs.
var Request = require('request').Request;

// Internal libs.
var debug = require('./utils/debug');

var ExtendedRequest = function () {
  debug('ExtendedRequest');
  ExtendedRequest.super_.apply(this, arguments);
};
util.inherits(ExtendedRequest, Request);

ExtendedRequest.prototype.init = function (options) {
  debug('ExtendedRequest.init()');
  ExtendedRequest.super_.prototype.init.apply(this, arguments);

  if (options && options.cacheStore && typeof options.cacheStore === 'function') {
    debug('ExtendedRequest.init() cacheStore found');
    options.cacheStore(this);
  }
}

module.exports = ExtendedRequest;