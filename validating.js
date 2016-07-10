var Surfing = require('./surfing.js');

// Выполняет работу валидации при проъоде по дереву
var Validating = function(dictionary, schema, data, handler) {
  this.dictionary = dictionary;
  this.schema = schema;
  this.data = data;
  this.handler = handler;
  
  if (!this.defaultOperator) this.defaultOperator = 'default';
  
  this.stack = [{
    data: this.data, // Данные на этом уровне, могут не отличаться от предыдущего.
    schema: this.schema, // Схема на этом уровне, всегда отличается от предыдущего.
    operator: this.defaultOperator
  }];
  
  // Последний уровень стека.
  this.last;
  
  // Активный уровень стека
  this.active;
  
  // Список выбрашенных ошибок по мере прохождения.
  this.errors = [];
  
  // Выброшенная в данный момент ошибка.
  // Не приводит к изменению стека, но мы идём в обратном направлении по нему.
  this.throwedErrors = [];
  
  // Обрабатываемая сейчас ошибка.
  this.throwedError;
};

Validating.prototype = new Surfing();

Validating.prototype.travers = function() {
  while(this.stack.length) {
    this.last = this.stack.length - 1;
    if (!this.throwedErrors.length) {
      this.active = this.last;
      if (this.dictionary[this.stack[this.last].operator].validate && !this.stack[this.last].validated) {
        this.dictionary[this.stack[this.last].operator].validate(this);
        this.stack[this.last].validated = true;
      }
      if (this.handler) this.handler(this);
    }
    if (!this.throwedErrors.length) {
        this.dictionary[this.stack[this.last].operator].operate(this);
    } else {
      this.throwedError = this.throwedErrors.length - 1;
      if (this.throwedErrors[this.throwedError].index > -1) {
        this.active = this.throwedErrors[this.throwedError].index;
        
        if (this.dictionary[this.stack[this.active].operator].catch) {
          this.dictionary[this.stack[this.active].operator].catch(this);
        }
        
        // Если посли ловли ошибки она еще есть движемся по стеку вверх
        if (this.throwedErrors[this.throwedError]) {
          this.throwedErrors[this.throwedError].index--;
        }
      } else {
        this.errors.push({
          error: this.throwedErrors[this.throwedError].error,
          schemaPath: this.throwedErrors[this.throwedError].schemaPath,
          operatorsPath: this.throwedErrors[this.throwedError].operatorsPath
        });
        this.throwedErrors.pop();
      }
    }
  }
};

Validating.prototype.throw = function(error) {
  this.throwedErrors.push({
    error: error,
    index: this.stack.length - 2,
    schemaPath: this.schemaPath(this.last),
    operatorsPath: this.operatorsPath(this.last)
  });
};

module.exports = Validating;