var lodash = require('lodash');
var Operator = require('../operator.js');

var And = function() {
  
  // Сдвигает стек на один уровень вглубь по схеме, или обратно если кончались варианты.
  // Добавляет ключ в путь вложенности.
  this.operate = function(surfing) {
    
    // Первый вызов оператора?
      // Определить как перебирать этот тип схема для данного оператора
      // Перезапустить
    // Это массив?
      // Перебирать каждый следующий элемент как имя оператора
        // Сдвигать внутрь по этому ключу
    // Это ключи объекта?
      // Перебирать каждый ключ как имя оператора
        // Сдвигать внутрь по этому ключу
    
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
            path: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]
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
              schema: undefined,
              operator: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key],
              path: surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]
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