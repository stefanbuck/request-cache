'use strict';

// Nodejs libs.
var util = require('util');

// External libs.
var request = require('request');
var Request = require('./extended_request');

// The following code is copied from https://github.com/mikeal/request for compatibility
function copy (obj) {
  var o = {}
  Object.keys(obj).forEach(function (i) {
    o[i] = obj[i]
  })
  return o
}

var index = function (uri, options, callback) {
  if (typeof uri === 'undefined') throw new Error('undefined is not a valid uri or options object.')
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
  }

  options = copy(options)

  if (callback) options.callback = callback
  var r = new Request(options)
  return r
};

util.inherits(index, request);

module.exports = index;