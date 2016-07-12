var Surfing = function(schema, data, options) {
  
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
    // schemaPath
    // dataPath
  }];
  
  this.last;
  
};

Surfing.dictionary = require('./dictionary.js');

Surfing.prototype.travers = function() {
  while(this.stack.length) {
    this.last = this.stack.length - 1;
    
    if (this.handler) this.handler(this);
    if (this.dictionary[this.stack[this.last].operator]) {
      this.dictionary[this.stack[this.last].operator].operate(this);
    } else {
      throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
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
  return this.stack[this.last].data;
};

module.exports = Surfing;