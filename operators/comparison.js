var lodash = require('lodash');
var Operator = require('../operator.js');

var Equal = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.validate = function(surfing) {
    if (!lodash.isEqual(surfing.stack[surfing.last].data, surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Equal.prototype = Operator;

exports.equal = new Equal();

var Greater = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.validate = function(surfing) {
    if (!(surfing.stack[surfing.last].data > surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Greater.prototype = Operator;

exports.greater = new Greater();

var Less = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.validate = function(surfing) {
    if (!(surfing.stack[surfing.last].data < surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Less.prototype = Operator;

exports.less = new Less();

var GreaterEqual = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.validate = function(surfing) {
    if (!(surfing.stack[surfing.last].data >= surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

GreaterEqual.prototype = Operator;

exports.greaterEqual = new GreaterEqual();

var LessEqual = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.validate = function(surfing) {
    if (!(surfing.stack[surfing.last].data <= surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

LessEqual.prototype = Operator;

exports.lessEqual = new LessEqual();