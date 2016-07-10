// Выполняет работу прохода по дереву схему.
var Surfing = function(dictionary, schema, data, handler) {
  this.dictionary = dictionary;
  this.schema = schema;
  this.data = data;
  this.handler = handler;
  
  if (!this.defaultOperator) this.defaultOperator = 'and';
  
  this.stack = [{
    data: this.data, // Данные на этом уровне, могут не отличаться от предыдущего.
    schema: this.schema, // Схема на этом уровне, всегда отличается от предыдущего.
    operator: this.defaultOperator
  }];
  
  // Последний уровень стека, что бы не считать заного при обращении.
  this.last;
  
};

Surfing.prototype.travers = function() {
  while(this.stack.length) {
    this.last = this.stack.length - 1;
    
    if (this.handler) this.handler(this);
    this.dictionary[this.stack[this.last].operator].operate(this);
  }
};

Surfing.prototype.schemaPath = function(stackPointer) {
  var path = [];
  for (var s = 0; s <= stackPointer; s++) {
    if (this.stack[s].path) path.push(this.stack[s].path);
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

module.exports = Surfing;