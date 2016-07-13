var Surfing = function(schema, data, options) {
  this.options = options?options:{};
  
  if (!this.options.dictionary) {
    this.options.dictionary = Surfing.dictionary;
  }
  
  if (typeof(this.options.details) !== 'boolean') {
    this.options.details = true;
  }
  
  if (typeof(this.options.execute) !== 'boolean') {
    this.options.execute = true;
  }
  
  this.dictionary = this.options.dictionary;
  this.schema = schema;
  this.data = data;
  this.beforeExecution = this.options.beforeExecution;
  this.afterExecution = this.options.afterExecution;
  this.beforeOperation = this.options.beforeOperation;
  this.afterOperation = this.options.afterOperation;
  
  if (!this.defaultOperator) this.defaultOperator = 'and';
  
  this.stack = [{
    data: this.data,
    schema: this.schema,
    operator: this.defaultOperator
  }];
  
  this.last;
  
  this.active;
  
  this.errors = [];
  
  this.throwedErrors = [];
  
  this.throwedError;
};

Surfing.dictionary = require('./dictionary.js');

Surfing.prototype.travers = function() {
  while(this.stack.length) {
    this.last = this.stack.length - 1;
    if (!this.throwedErrors.length) {
      this.active = this.last;
      
      if (this.options.execute) {
        if (this.dictionary[this.stack[this.last].operator]) {
          if (this.beforeExecution) this.beforeExecution(this);
          if (this.dictionary[this.stack[this.last].operator].execute && !this.stack[this.last].validated) {
            this.dictionary[this.stack[this.last].operator].execute(this);
            this.stack[this.last].validated = true;
          }
          if (this.afterExecution) this.afterExecution(this);
        } else {
          throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
        }
      }
    }
    if (!this.throwedErrors.length) {
      if (this.dictionary[this.stack[this.last].operator]) {
        this.dictionary[this.stack[this.last].operator].operate(this);
      } else {
        throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
      }
    } else {
      this.throwedError = this.throwedErrors.length - 1;
      if (this.throwedErrors[this.throwedError].index > -1) {
        this.active = this.throwedErrors[this.throwedError].index;
        
        if (this.dictionary[this.stack[this.last].operator]) {
          if (this.beforeOperation) this.beforeOperation(this);
          if (this.dictionary[this.stack[this.active].operator].catch) {
            this.dictionary[this.stack[this.active].operator].catch(this);
          }
          if (this.afterOperation) this.afterOperation(this);
        } else {
          throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
        }
        
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

Surfing.prototype.schemaPath = function(stackPointer) {
  var path = [];
  for (var s = 0; s <= stackPointer; s++) {
    if (this.stack[s].schemaPath) path.push(this.stack[s].schemaPath);
  }
  return path;
};

Surfing.prototype.dataPath = function(stackPointer) {
  var path = [];
  for (var s = 0; s <= stackPointer; s++) {
    if (this.stack[s].dataPath) path.push(this.stack[s].dataPath);
  }
  return path;
};

Surfing.prototype.operatorsPath = function(stackPointer) {
  var path = [];
  for (var s = 0; s <= stackPointer; s++) {
    if (this.stack[s].operator) path.push(this.stack[s].operator);
  }
  return path;
};

Surfing.prototype.getData = function() {
  if (this.stack.length)
    return this.stack[this.last].data;
};

Surfing.prototype.getSchema = function() {
  if (this.stack.length)
    return this.stack[this.last].schema;
};

Surfing.prototype.throw = function(error, index) {
  if (typeof(index) !== 'number') {
    if (this.active != this.last) {
      var index = this.active - 1;
    } else {
      var index = this.last - 1;
    }
  }
  this.throwedErrors.push({
    error: error,
    index: index,
    dataPath: this.dataPath(index + 1),
    schemaPath: this.schemaPath(index + 1),
    operatorsPath: this.operatorsPath(index + 1)
  });
};

module.exports = Surfing;