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
      var surfing = new Surfing(dictionary, schema, data);
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
      var validating = new Validating(dictionary, schema, data);
      validating.travers();
      assert.lengthOf(validating.errors, 2);
      assert.lengthOf(validating.errors[0].schemaPath, 8);
      assert.lengthOf(validating.errors[1].schemaPath, 8);
      assert.lengthOf(validating.errors[0].operatorsPath, 11);
      assert.lengthOf(validating.errors[1].operatorsPath, 11);
    });
  });
  describe('operators', function() {
    describe('undefined', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { undefined: true }, undefined);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { undefined: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'undefined'], schemaPath: ['undefined']}]);
      });
    });
    describe('boolean', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { boolean: true }, true);
        validating.travers();
        assert.deepEqual(validating.errors, []);
        var validating = new Validating(dictionary, { boolean: true }, false);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { boolean: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'boolean'], schemaPath: ['boolean']}]);
      });
    });
    describe('number', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { number: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { number: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'number'], schemaPath: ['number']}]);
      });
    });
    describe('string', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { string: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { string: true }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'string'], schemaPath: ['string']}]);
      });
    });
    describe('object', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { object: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, []);
        var validating = new Validating(dictionary, { object: true }, []);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { object: true }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'object'], schemaPath: ['object']}]);
      });
    });
    describe('array', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { array: true }, []);
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { array: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'array'], schemaPath: ['array']}]);
      });
    });
    describe('function', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { function: true }, function() {});
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { function: true }, {});
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'function'], schemaPath: ['function']}]);
      });
    });
    describe('and', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { and: { and: { and: { string: true } } } }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { and: { and: { and: { string: true } } } }, 123);
        validating.travers();
        assert.deepEqual(validating.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and', 'string']}]);
      });
    });
    describe('or', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { or: { or: { or: { number: true, string: true, boolean: true } } } }, 'abc');
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
      it('false', function() {
        var validating = new Validating(dictionary, { or: { or: { or: { number: true, string: true, boolean: true } } } }, []);
        validating.travers();
        assert.deepEqual(validating.errors, [
          {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'boolean'], schemaPath: ['or', 'or', 'or', 'boolean']},
          {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'string'], schemaPath: ['or', 'or', 'or', 'string']},
          {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'number'], schemaPath: ['or', 'or', 'or', 'number']},
        ]);
      });
    });
    describe('props', function() {
      it('true', function() {
        var validating = new Validating(dictionary, { props: { abc: { string: true } } }, { abc: 'cde' });
        validating.travers();
        assert.deepEqual(validating.errors, []);
      });
    });
  });
  describe('Performance', function() {
    for (var c = 0; c < 5; c++) {
      it('empty 10000', function() {
        for (var i = 0; i < 100000; i++) {
          var validating = new Validating(dictionary, {}, undefined);
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
          var validating = new Validating(dictionary, {
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