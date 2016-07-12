var lodash = require('lodash');
var assert = require('chai').assert;
var operator = require('../operator.js');

exports.Undefined = function() {
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

exports.Undefined.prototype = operator;

exports.undefined = new exports.Undefined();

exports.Boolean = function() {
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

exports.Boolean.prototype = operator;

exports.boolean = new exports.Boolean();

exports.Null = function() {
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
      if (surfing.stack[surfing.last].data !== null) {
        surfing.throw();
      }
    }
  };
};

exports.Null.prototype = operator;

exports.null = new exports.Null();

exports.nan = function() {
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
      if (!(typeof(surfing.stack[surfing.last].data) == 'number' && surfing.stack[surfing.last].data != +surfing.stack[surfing.last].data)) {
        surfing.throw();
      }
    }
  };
};

exports.nan.prototype = operator;

exports.nan = new exports.nan();

exports.Number = function() {
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

exports.Number.prototype = operator;

exports.number = new exports.Number();

exports.String = function() {
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

exports.String.prototype = operator;

exports.string = new exports.String();

exports.Object = function() {
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

exports.Object.prototype = operator;

exports.object = new exports.Object();

exports.Array = function() {
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
      if (typeof(surfing.stack[surfing.last].data) !== 'object' || Object.prototype.toString.call(surfing.stack[surfing.last].data) !== '[object Array]') {
        surfing.throw();
      }
    }
  };
};

exports.Array.prototype = operator;

exports.array = new exports.Array();

exports.Function = function() {
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

exports.Function.prototype = operator;

exports.function = new exports.Function();