var Operator = function() {};

Operator.prototype.inDefaultOperator = function(surfing) {
  surfing.stack.push({
    data: surfing.stack[surfing.last].data,
    schema: surfing.stack[surfing.last].schema,
    operator: surfing.defaultOperator
  });
};

module.exports = new Operator();