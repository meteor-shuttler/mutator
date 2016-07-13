var lodash = require('lodash');
var Operator = require('../operator.js');

var Regex = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.execute = function(surfing) {
    if (!surfing.stack[surfing.last].schema.test(surfing.stack[surfing.last].data)) {
      surfing.throw();
    }
  };
};

Regex.prototype = Operator;

exports.regex = new Regex();