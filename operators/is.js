var lodash = require('lodash');
var assert = require('chai').assert;
var operator = require('../operator.js');

var Undefined = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'undefined') {
        surfing.throw();
      }
    }
  };
};

Undefined.prototype = operator;

exports.undefined = new Undefined();

var Boolean = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'boolean') {
        surfing.throw();
      }
    }
  };
};

Boolean.prototype = operator;

exports.boolean = new Boolean();

var Number = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'number') {
        surfing.throw();
      }
    }
  };
};

Number.prototype = operator;

exports.number = new Number();

var String = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'string') {
        surfing.throw();
      }
    }
  };
};

String.prototype = operator;

exports.string = new String();

var Object = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'object') {
        surfing.throw();
      }
    }
  };
};

Object.prototype = operator;

exports.object = new Object();

var Array = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'object' || Object.prototype.toString.call(surfing.stack[surfing.last].data) === '[object Array]') {
        surfing.throw();
      }
    }
  };
};

Array.prototype = operator;

exports.array = new Array();

var Function = function() {
  this.operate = function(surfing) {
    if (surfing.stack[surfing.last].operated) {
      surfing.stack.pop();
    } else {
      surfing.stack[surfing.last].operated = true;
      this.inDefaultOperator(surfing);
    }
  };
  this.validate = function(surfing) {
    if (!surfing.stack[surfing.last].operated) {
      if (typeof(surfing.stack[surfing.last].data) !== 'function') {
        surfing.throw();
      }
    }
  };
};

Function.prototype = operator;

exports.function = new Function();