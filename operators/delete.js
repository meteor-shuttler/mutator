var lodash = require('lodash');
var Operator = require('../operator.js');

var Delete = function() {
  this.operate = function(surfing) {
    var i;
    for (i = surfing.stack.length - 2; i >= 0; i--) {
      if (surfing.stack[i].dataPath) {
        var parent = surfing.stack[i-1].data;
        break;
      }
    }
    if (parent) {
      delete surfing.stack[i-1].data[surfing.stack[i].dataPath];
    } else {
      surfing.data = undefined;
    }
    surfing.stack.pop();
  };
};

Delete.prototype = Operator;

module.exports = new Delete();