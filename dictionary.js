module.exports = {
  and: require('./operators/and.js'),
  or: require('./operators/or.js'),
  props: require('./operators/props.js'),
  undefined: require('./operators/is.js').undefined,
  boolean: require('./operators/is.js').boolean,
  number: require('./operators/is.js').number,
  string: require('./operators/is.js').string,
  object: require('./operators/is.js').object,
  array: require('./operators/is.js').array,
  function: require('./operators/is.js').function
};