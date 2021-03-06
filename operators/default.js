var lodash = require('lodash');
var Operator = require('../operator.js');

var Default = function() {
  this.operate = function(surfing) {
    if (!surfing.stack[surfing.last].data) {
      var i;
      for (i = surfing.stack.length - 2; i >= 0; i--) {
        if (surfing.stack[i].dataPath) {
          var parent = surfing.stack[i-1].data;
          break;
        }
      }
      if (parent) {
        surfing.stack[i-1].data[surfing.stack[i].dataPath] = surfing.stack[surfing.last].schema;
      } else {
        surfing.data = surfing.stack[surfing.last].schema;
      }
    }
    surfing.stack.pop();
  };
};

Default.prototype = Operator;

module.exports = new Default();