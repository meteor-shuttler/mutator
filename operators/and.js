var lodash = require('lodash');
var Operator = require('../operator.js');

var And = function() {
  this.operate = function(surfing) {
    if (typeof(surfing.stack[surfing.last].schema) != 'object' || surfing.stack[surfing.last].break) {
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
          if (typeof(surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) == 'string') {
            surfing.stack.push({
              data: surfing.stack[surfing.last].data,
              schema: undefined,
              operator: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key],
              schemaPath: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]
            });
          } else if (typeof(surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) == 'object'){
            surfing.stack.push({
              data: surfing.stack[surfing.last].data,
              schema: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key],
              operator: surfing.defaultOperator,
              schemaPath: surfing.defaultOperator
            });
          } else if (typeof(surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) == 'function'){
            surfing.stack.push({
              data: surfing.stack[surfing.last].data,
              schema: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key],
              operator: 'custom',
              schemaPath: 'custom'
            });
          } else {
            // ignore
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
  this.catch = function(surfing) {
    if (!surfing.options.details) {
      surfing.stack[surfing.active].break = true;
    }
  }
};

And.prototype = Operator;

module.exports = new And();