var assert = require('chai').assert;
var Surfing = require('./surfing.js');
var Validating = require('./validating.js');
var dictionary = require('./dictionary.js');

describe('surfing', function() {
  describe('Surfing', function() {
    it('Surf by schema', function() {
      var schema = {
        object: {
          props: {
            z: {
              object: {
                props: {
                  abc: {
                    string: true
                  }
                }
              }
            }
          }
        }
      };
      var data = {
        z: { abc: 'def' }
      };
      var surfing = new Surfing(schema, data);
      surfing.travers();
    });
  });
  describe('Validating', function() {
    it('Surf by schema with validation and errors', function() {
      var schema = {
        object: {
          props: {
            z: {
              object: {
                props: {
                  abc: {
                    or: {
                      boolean: true,
                      number: true
                    }
                  }
                }
              }
            }
          }
        }
      };
      var data = {
        z: { abc: 'def' }
      };
      var validating = new Validating(schema, data);
      validating.travers();
      assert.lengthOf(validating.errors, 2);
      assert.lengthOf(validating.errors[0].schemaPath, 8);
      assert.lengthOf(validating.errors[1].schemaPath, 8);
      assert.lengthOf(validating.errors[0].operatorsPath, 11);
      assert.lengthOf(validating.errors[1].operatorsPath, 11);
    });
  });
  describe('options', function() {
    describe('details', function() {
      it('true', function() {
        
      });
      describe('false', function() {
        it('and', function() {
          var validating = new Validating({
            string: true,
            number: true
          }, {}, { details: false });
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'string'], schemaPath: ['string']}]);
        });
        it('or', function() {
          var validating = new Validating({
            or: {
              string: true,
              number: true
            }
          }, {}, { details: false });
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'or'], schemaPath: ['or']}]);
        });
      });
    });
  });
  describe('operators', function() {
    describe('undefined', function() {
      it('true', function() {
        var validating = new Validating({ undefined: true }, undefined);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ undefined: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'undefined'], schemaPath: ['undefined']}]);
      });
    });
    describe('boolean', function() {
      it('true', function() {
        var validating = new Validating({ boolean: true }, true);
        validating.travers();
        assert.deepEqual(validating.errors, []);
        var validating = new Validating({ boolean: true }, false);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ boolean: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'boolean'], schemaPath: ['boolean']}]);
      });
    });
    describe('null', function() {
      it('true', function() {
        var validating = new Validating({ null: true }, null);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ null: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'null'], schemaPath: ['null']}]);
      });
    });
    describe('nan', function() {
      it('true', function() {
        var validating = new Validating({ nan: true }, NaN);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ nan: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'nan'], schemaPath: ['nan']}]);
      });
    });
    describe('number', function() {
      it('true', function() {
        var validating = new Validating({ number: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ number: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'number'], schemaPath: ['number']}]);
      });
    });
    describe('string', function() {
      it('true', function() {
        var validating = new Validating({ string: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ string: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'string'], schemaPath: ['string']}]);
      });
    });
    describe('object', function() {
      it('true', function() {
        var validating = new Validating({ object: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, []);
        var validating = new Validating({ object: true }, []);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ object: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'object'], schemaPath: ['object']}]);
      });
    });
    describe('array', function() {
      it('true', function() {
        var validating = new Validating({ array: true }, []);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ array: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'array'], schemaPath: ['array']}]);
      });
    });
    describe('function', function() {
      it('true', function() {
        var validating = new Validating({ function: true }, function() {});
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ function: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'function'], schemaPath: ['function']}]);
      });
    });
    describe('and', function() {
      describe('object', function() {
        it('true', function() {
          var validating = new Validating({ and: { and: { and: { string: true } } } }, 'abc');
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ and: { and: { and: { string: true } } } }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and', 'string']}]);
        });
      });
      describe('array', function() {
        describe('object', function() {
          it('true', function() {
            var validating = new Validating([ { and: [ { string: true } ] } ], 'abc');
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { and: [ { string: true } ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and', 'string']}]);
          });
        });
        describe('string', function() {
          it('true', function() {
            var validating = new Validating([ { and: [ [ 'string' ] ] } ], 'abc');
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { and: [ [ 'string' ] ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and',  'string']}]);
          });
        });
        describe('function', function() {
          it('true', function() {
            var validating = new Validating([ { and: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { and: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 234);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'custom'], schemaPath: ['and', 'and', 'and',  'custom']}]);
          });
        });
      });
    });
    describe('or', function() {
      describe('object', function() {
        it('true', function() {
          var validating = new Validating({ or: { or: { or: { number: true, string: true, boolean: true } } } }, 'abc');
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ or: { or: { or: { number: true, string: true, boolean: true } } } }, []);
          validating.travers();
          assert.deepEqual(validating.errors, [
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'boolean'], schemaPath: ['or', 'or', 'or', 'boolean']},
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'string'], schemaPath: ['or', 'or', 'or', 'string']},
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'number'], schemaPath: ['or', 'or', 'or', 'number']},
          ]);
        });
      });
      describe('array', function() {
        describe('object', function() {
          it('true', function() {
            var validating = new Validating([ { or: [ { string: true } ] } ], 'abc');
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { or: [ { string: true } ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'string'], schemaPath: ['and', 'or', 'and', 'string']}]);
          });
        });
        describe('string', function() {
          it('true', function() {
            var validating = new Validating([ { or: [ [ 'string' ] ] } ], 'abc');
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { or: [ [ 'string' ] ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'string'], schemaPath: ['and', 'or', 'and', 'string']}]);
          });
        });
        describe('function', function() {
          it('true', function() {
            var validating = new Validating([ { or: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 123);
            validating.travers();
            assert.deepEqual(validating.errors, []);
          });
          it('false', function() {
            var validating = new Validating([ { or: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 234);
            validating.travers();
            assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'custom'], schemaPath: ['and', 'or', 'and', 'custom']}]);
          });
        });
      });
    });
    describe('props', function() {
      it('true', function() {
        var validating = new Validating({ props: { abc: { string: true } } }, { abc: 'cde' });
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
    });
    describe('custom', function() {
      it('true', function() {
        var validating = new Validating({ custom: function(surfing) { if (surfing.getData() != 123) surfing.throw(); } }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ custom: function(surfing) { if (surfing.getData() != 123) surfing.throw(); } }, 456);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'custom'], schemaPath: ['custom']}]);
      });
    });
    describe('comparison', function() {
      describe('equal', function() {
        it('true', function() {
          var validating = new Validating({ equal: 123 }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ equal: 123 }, 456);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'equal'], schemaPath: ['equal']}]);
        });
      });
      describe('greater', function() {
        it('true', function() {
          var validating = new Validating({ greater: 123 }, 124);
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ greater: 123 }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'greater'], schemaPath: ['greater']}]);
        });
      });
      describe('less', function() {
        it('true', function() {
          var validating = new Validating({ less: 123 }, 122);
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ less: 123 }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'less'], schemaPath: ['less']}]);
        });
      });
      describe('greaterEqual', function() {
        it('true', function() {
          var validating = new Validating({ greaterEqual: 123 }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ greaterEqual: 123 }, 122);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'greaterEqual'], schemaPath: ['greaterEqual']}]);
        });
      });
      describe('lessEqual', function() {
        it('true', function() {
          var validating = new Validating({ lessEqual: 123 }, 123);
          validating.travers();
          assert.deepEqual(validating.errors, []);
        });
        it('false', function() {
          var validating = new Validating({ lessEqual: 123 }, 124);
          validating.travers();
          assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'lessEqual'], schemaPath: ['lessEqual']}]);
        });
      });
    });
    describe('set', function() {
      it('root', function() {
        var validating = new Validating({ set: 456 }, 123);
        validating.travers();
        assert.deepEqual(validating.data, 456);
      });
      it('props', function() {
        var validating = new Validating({ props: { abc: { set: 456 } } }, { abc: 123 });
        validating.travers();
        assert.deepEqual(validating.data, { abc: 456 });
      });
      it('each', function() {
        var validating = new Validating({ each: { set: 456 } }, { abc: 123, bcd: 234, cde: 345 });
        validating.travers();
        assert.deepEqual(validating.data, { abc: 456, bcd: 456, cde: 456 });
      });
    });
    describe('default', function() {
      it('root', function() {
        var validating = new Validating({ default: 456 }, 123);
        validating.travers();
        assert.deepEqual(validating.data, 123);
        var validating = new Validating({ default: 456 }, undefined);
        validating.travers();
        assert.deepEqual(validating.data, 456);
        var validating = new Validating({ default: 456 }, null);
        validating.travers();
        assert.deepEqual(validating.data, 456);
        var validating = new Validating({ default: 456 }, 0);
        validating.travers();
        assert.deepEqual(validating.data, 456);
        var validating = new Validating({ default: 456 }, '');
        validating.travers();
        assert.deepEqual(validating.data, 456);
      });
      it('props', function() {
        var validating = new Validating({ props: { abc: { default: 456 } } }, { abc: undefined });
        validating.travers();
        assert.deepEqual(validating.data, { abc: 456 });
      });
      it('each', function() {
        var validating = new Validating({ each: { default: 234 } }, { abc: 123, bcd: undefined, cde: 345 });
        validating.travers();
        assert.deepEqual(validating.data, { abc: 123, bcd: 234, cde: 345 });
      });
    });
    describe('delete', function() {
      it('root', function() {
        var validating = new Validating({ delete: true }, 123);
        validating.travers();
        assert.deepEqual(validating.data, undefined);
      });
      it('props', function() {
        var validating = new Validating({ props: { abc: { delete: true } } }, { abc: 123, bcd: 234, cde: 345 });
        validating.travers();
        assert.deepEqual(validating.data, { bcd: 234, cde: 345 });
      });
      it('each', function() {
        var validating = new Validating({ each: { delete: true } }, { abc: 123, bcd: 234, cde: 345 });
        validating.travers();
        assert.deepEqual(validating.data, {});
      });
    });
    describe('each', function() {
      it('true', function() {
        var validating = new Validating({ each: { string: true } }, { a: 'abc', b: 'bcd', c: 'cde' });
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating({ each: { number: true } }, ['abc', 'bcd', 'cde']);
        validating.travers();
        assert.deepEqual(validating.errors, [
          {'error': undefined, operatorsPath: ['and', 'each', 'and', 'number'], schemaPath: ['each', 'number']},
          {'error': undefined, operatorsPath: ['and', 'each', 'and', 'number'], schemaPath: ['each', 'number']},
          {'error': undefined, operatorsPath: ['and', 'each', 'and', 'number'], schemaPath: ['each', 'number']}
        ]);
      });
    });
  });
  describe('Performance', function() {
    for (var c = 0; c < 5; c++) {
      it('empty 10000', function() {
        for (var i = 0; i < 100000; i++) {
          var validating = new Validating({}, undefined);
          validating.travers();
        }
     });
    }
    for (var c = 0; c < 5; c++) {
      it('document 1000', function() {
        for (var i = 0; i < 1000; i++) {
          var ref = {
            or: {
              object: {
                props: {
                  id: {
                    string: true
                  },
                  collection: {
                    string: true
                  }
                }
              },
              number: true
            }
          };
          var validating = new Validating({
            object: {
              props: {
                _source: ref,
                _target: ref,
                _selected: {
                  or: {
                    object: {
                      props: {
                        selector: {
                          string: true
                        }
                      }
                    },
                    undefined: true
                  }
                }
              }
            }
          }, {
            _source: { id: '507f1f77bcf86cd799439011', collection: 'users' },
            _target: 12345,
            _selected: { selector: '507f191e810c19729de860ea' }
          });
          validating.travers();
          assert.deepEqual(validating.errors, []);
        }
     });
    }
  });
});