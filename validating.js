var Surfing = require('./surfing.js');

var Validating = function(schema, data, options) {
  
  this.options = options?options:{};
  
  if (!this.options.dictionary) {
    this.options.dictionary = Surfing.dictionary;
  }
  if (typeof(this.options.details) !== 'boolean') {
    this.options.details = true;
  }
  
  this.dictionary = this.options.dictionary;
  this.schema = schema;
  this.data = data;
  this.handler = this.options.handler;
  
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

Validating.prototype = new Surfing();

Validating.prototype.travers = function() {
  while(this.stack.length) {
    this.last = this.stack.length - 1;
    if (!this.throwedErrors.length) {
      this.active = this.last;
      
      if (this.dictionary[this.stack[this.last].operator]) {
        if (this.dictionary[this.stack[this.last].operator].validate && !this.stack[this.last].validated) {
          this.dictionary[this.stack[this.last].operator].validate(this);
          this.stack[this.last].validated = true;
        }
      } else {
        throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
      }
      if (this.handler) this.handler(this);
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
          if (this.dictionary[this.stack[this.active].operator].catch) {
            this.dictionary[this.stack[this.active].operator].catch(this);
          }
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

Validating.prototype.throw = function(error, index) {
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
    schemaPath: this.schemaPath(index + 1),
    operatorsPath: this.operatorsPath(index + 1)
  });
};

module.exports = Validating;