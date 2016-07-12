var lodash = require('lodash');
var Operator = require('../operator.js');

var And = function() {
  this.operate = function(surfing) {
    if (typeof(surfing.stack[surfing.last].schema) != 'object') {
      surfing.stack.pop();
    } else {
      if (surfing.stack[surfing.last].keys) {
        surfing.stack[surfing.last].key++;
        if (surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]) {
          surfing.stack.push({
            data: surfing.stack[surfing.last].data,
            schema: surfing.stack[surfing.last].schema[surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]],
            operator: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key],
            schemaPath: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]
          });
        } else {
          surfing.stack.pop();
        }
      } else if (surfing.stack[surfing.last].array){
        surfing.stack[surfing.last].key++;
        if (surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) {
          if (typeof(surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) === 'string') {
            surfing.stack.push({
              data: surfing.stack[surfing.last].data,
              schema: surfing.stack[surfing.last].schema[surfing.stack[surfing.last].key],
              operator: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key],
              schemaPath: surfing.stack[surfing.last].key
            });
          } else {
            throw new Error('unexpected');
          }
        } else {
          surfing.stack.pop();
        }
      } else {
        if (typeof(surfing.stack[surfing.last].schema) === 'object') {
          if (lodash.isArray(surfing.stack[surfing.last].schema)) {
            surfing.stack[surfing.last].array = surfing.stack[surfing.last].schema;
          } else {
            surfing.stack[surfing.last].keys = lodash.keys(surfing.stack[surfing.last].schema);
          }
          surfing.stack[surfing.last].key = -1;
        } else {
          throw new Error('unexpected');
        }
      }
    }
  };
};

And.prototype = Operator;

module.exports = new And();