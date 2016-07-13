var Surfing = require('./surfing.js');

var Finding = function(schema, data, options) {
  
  this.options = options?options:{};
  
  if (!this.options.dictionary) {
    this.options.dictionary = Surfing.dictionary;
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
  
  this.fail = false;
};

Finding.prototype = new Surfing();

Finding.prototype.byOperators = function() {
  var paths = arguments;
  if (!this.fail) {
    var currents = [this.stack.length - 1];
    this.last = this.stack.length - 1;
    while(currents.length - 1 < paths.length && this.stack.length) {
      if (this.handler) this.handler(this);
      if (this.dictionary[this.stack[this.last].operator]) {
        this.dictionary[this.stack[this.last].operator].operate(this);
        if (this.stack.length - 1 > this.last) {
          if (this.stack[this.stack.length - 1].operator) {
            if (this.stack.length - 1 != currents[currents.length - 1]) {
              if (this.stack[this.stack.length - 1].operator == paths[currents.length - 1]) {
                currents.push(this.stack.length - 1);
              } else {
                this.stack.pop();
              }
            }
          }
        } else if (this.stack.length - 1 < currents[currents.length - 1]){
          currents.pop();
        }
      } else {
        throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
      }
      this.last = this.stack.length - 1;
    }
    if (currents.length - 1 < paths.length) {
      this.fail = true;
    }
  }
  return this;
};
Finding.prototype.bySchema = function() {
  var paths = arguments;
  if (!this.fail) {
    var currents = [this.stack.length - 1];
    this.last = this.stack.length - 1;
    while(currents.length - 1 < paths.length && this.stack.length) {
      if (this.handler) this.handler(this);
      if (this.dictionary[this.stack[this.last].operator]) {
        this.dictionary[this.stack[this.last].operator].operate(this);
        if (this.stack.length - 1 > this.last) {
          if (this.stack[this.stack.length - 1].schemaPath) {
            if (this.stack.length - 1 != currents[currents.length - 1]) {
              if (this.stack[this.stack.length - 1].schemaPath == paths[currents.length - 1]) {
                currents.push(this.stack.length - 1);
              } else {
                this.stack.pop();
              }
            }
          }
        } else if (this.stack.length - 1 < currents[currents.length - 1]){
          currents.pop();
        }
      } else {
        throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
      }
      this.last = this.stack.length - 1;
    }
    if (currents.length - 1 < paths.length) {
      this.fail = true;
    }
  }
  return this;
};
Finding.prototype.byData = function() {
  var paths = arguments;
  if (!this.fail) {
    var currents = [this.stack.length - 1];
    this.last = this.stack.length - 1;
    while(currents.length - 1 < paths.length && this.stack.length) {
      if (this.handler) this.handler(this);
      if (this.dictionary[this.stack[this.last].operator]) {
        this.dictionary[this.stack[this.last].operator].operate(this);
        if (this.stack.length - 1 > this.last) {
          if (this.stack[this.stack.length - 1].dataPath) {
            if (this.stack.length - 1 != currents[currents.length - 1]) {
              if (this.stack[this.stack.length - 1].dataPath == paths[currents.length - 1]) {
                currents.push(this.stack.length - 1);
              } else {
                this.stack.pop();
              }
            }
          }
        } else if (this.stack.length - 1 < currents[currents.length - 1]){
          currents.pop();
        }
      } else {
        throw new Error('Operator "'+this.stack[this.last].operator+'" is not defined.');
      }
      this.last = this.stack.length - 1;
    }
    if (currents.length - 1 < paths.length) {
      this.fail = true;
    }
  }
  return this;
};

module.exports = Finding;