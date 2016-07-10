// Прототип одного уровня обработчика.
var Operator = function() {
  
  // Ловит ошибку если она была выброшена на уровне ниже.
  this.catch = function() {};
  
  // Выполняет работу оператора.
  // Может изменить положение в стеке схемы и стеке данных.
  // Может изменить данные
  // Может выбросить ошибку
  this.operate = function() {};
  
};

Operator.prototype.inDefaultOperator = function(surfing) {
  surfing.stack.push({
    data: surfing.stack[surfing.last].data,
    schema: surfing.stack[surfing.last].schema,
    operator: surfing.defaultOperator
  });
};

module.exports = new Operator();