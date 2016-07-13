var lodash = require('lodash');
var Operator = require('../operator.js');

var Equal = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.execute = function(surfing) {
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
  this.execute = function(surfing) {
    if (typeof(surfing.stack[surfing.last].data) == 'number') {
      var object = surfing.stack[surfing.last].data;
    } else {
      var object = lodash.size(surfing.stack[surfing.last].data);
    }
    if (!(object > surfing.stack[surfing.last].schema)) {
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
  this.execute = function(surfing) {
    if (typeof(surfing.stack[surfing.last].data) == 'number') {
      var object = surfing.stack[surfing.last].data;
    } else {
      var object = lodash.size(surfing.stack[surfing.last].data);
    }
    if (!(object < surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Less.prototype = Operator;

exports.less = new Less();

var Min = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.execute = function(surfing) {
    if (typeof(surfing.stack[surfing.last].data) == 'number') {
      var object = surfing.stack[surfing.last].data;
    } else {
      var object = lodash.size(surfing.stack[surfing.last].data);
    }
    if (!(object >= surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Min.prototype = Operator;

exports.min = new Min();

var Max = function() {
  this.operate = function(surfing) {
    surfing.stack.pop();
  };
  this.execute = function(surfing) {
    if (typeof(surfing.stack[surfing.last].data) == 'number') {
      var object = surfing.stack[surfing.last].data;
    } else {
      var object = lodash.size(surfing.stack[surfing.last].data);
    }
    if (!(object <= surfing.stack[surfing.last].schema)) {
      surfing.throw();
    }
  };
};

Max.prototype = Operator;

exports.max = new Max();