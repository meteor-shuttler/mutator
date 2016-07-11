var lodash = require('lodash');
var Operator = require('../operator.js');

var Or = function() {
  
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
    // Обработка ошибок
      // Сохранять все ошибки, и выбросить их если не один из вариантов не будет безошибочен
    
    if (typeof(surfing.stack[surfing.last].schema) != 'object') {
      surfing.stack.pop();
    } else {
      if (surfing.stack[surfing.last].hasError === false) {
        surfing.stack[surfing.last].errored = false;
      }
      if (surfing.stack[surfing.last].keys) {
        surfing.stack[surfing.last].key++;
        if (surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]) {
          surfing.stack[surfing.last].hasError = false;
          
          surfing.stack.push({
            data: surfing.stack[surfing.last].data,
            schema: surfing.stack[surfing.last].schema[surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]],
            operator: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key],
            path: surfing.stack[surfing.last].keys[surfing.stack[surfing.last].key]
          });
        } else {
          if (surfing.stack[surfing.last].errored) {
            surfing.throwedErrors.push.apply(surfing.throwedErrors, surfing.stack[surfing.last].errors);
          }
          surfing.stack.pop();
        }
      } else if (surfing.stack[surfing.last].array){
        surfing.stack[surfing.last].key++;
        if (surfing.stack[surfing.last].array[surfing.stack[surfing.last].key]) {
          surfing.stack[surfing.last].hasError = false;
          
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
          if (surfing.stack[surfing.last].errored) {
            surfing.throwedErrors.push.apply(surfing.throwedErrors, surfing.stack[surfing.last].errors);
          }
          surfing.stack.pop();
        }
      } else {
        if (typeof(surfing.stack[surfing.last].schema) === 'object') {
          if (lodash.isArray(surfing.stack[surfing.last].schema)) {
            surfing.stack[surfing.last].array = surfing.stack[surfing.last].schema;
            surfing.stack[surfing.last].errored = !!surfing.stack[surfing.last].array.length;
          } else {
            surfing.stack[surfing.last].keys = lodash.keys(surfing.stack[surfing.last].schema);
            surfing.stack[surfing.last].errored = !!surfing.stack[surfing.last].keys.length;
          }
          surfing.stack[surfing.last].key = -1;
          surfing.stack[surfing.last].errors = [];
          surfing.stack[surfing.last].hasError;
        } else {
          throw new Error('unexpected');
        }
      }
    }
  };
  
  this.catch = function(surfing) {
    for (var e = 0; e < surfing.throwedErrors.length; e++) {
      surfing.throwedErrors[e].index--;
    }
    surfing.stack[surfing.active].errors.push.apply(surfing.stack[surfing.active].errors, surfing.throwedErrors);
    surfing.stack[surfing.active].hasError = true;
    surfing.throwedErrors = [];
  };
};

Or.prototype = Operator;

module.exports = new Or();