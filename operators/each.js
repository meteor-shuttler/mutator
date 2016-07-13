var lodash = require('lodash');
var Operator = require('../operator.js');

var Each = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].keys) {
      surfing.stack[surfing.last].key++;
      if (surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]) {
        // surfing.stack[surfing.last].dataPath = surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key];
        surfing.stack.push({
          data: surfing.stack[surfing.last].data[surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]],
          schema: surfing.stack[surfing.last].schema,
          operator: surfing.defaultOperator,
          dataPath: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]
        });
      } else {
        surfing.stack.pop();
      }
    } else if (surfing.stack[surfing.last].array){
      surfing.stack[surfing.last].key++;
      if (surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) {
        // surfing.stack[surfing.last].dataPath = surfing.stack[surfing.last].key;
        surfing.stack.push({
          data: surfing.stack[surfing.last].data[surfing.stack[surfing.last].key],
          schema: surfing.stack[surfing.last].schema,
          operator: surfing.defaultOperator,
          dataPath: surfing.stack[surfing.last].key
        });
      } else {
        surfing.stack.pop();
      }
    } else {
      if (typeof(surfing.stack[surfing.last].data) === 'object') {
        if (lodash.isArray(surfing.stack[surfing.last].data)) {
          surfing.stack[surfing.last].array = surfing.stack[surfing.last].data;
        } else {
          surfing.stack[surfing.last].keys = lodash.keys(surfing.stack[surfing.last].data);
        }
        surfing.stack[surfing.last].key = -1;
      } else {
        throw new Error('unexpected');
      }
    }
  };
};

Each.prototype = Operator;

module.exports = new Each();