var lodash = require('lodash');
var Operator = require('../operator.js');

var Custom = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.execute = function(surfing) {
    surfing.stack[surfing.last].schema(surfing);
  };
};

Custom.prototype = Operator;

module.exports = new Custom();