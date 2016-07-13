var assert = require('chai').assert;
var Surfing = require('./surfing.js');
var Finding = require('./finding.js');
var dictionary = require('./dictionary.js');

describe('surfing', function() {
  describe('options', function() {
    describe('details', function() {
      describe('false', function() {
        it('and', function() {
          var surfing = new Surfing({
            string: true,
            number: true
          }, {}, { details: false });
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'string'], schemaPath: ['string']}]);
        });
        it('or', function() {
          var surfing = new Surfing({
            or: {
              string: true,
              number: true
            }
          }, {}, { details: false });
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'or'], schemaPath: ['or']}]);
        });
      });
    });
  });
  describe('finding', function() {
    it('byOperators', function() {
      var schema = {
        object: {
          props: {
            a: {
              object: {
                or: [
                  {
                    props: {
                      b: {
                        number: true
                      }
                    }
                  },
                  {
                    props: {
                      b: {
                        object: {
                          props: {
                            c: {
                              string: true
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      };
      var data = { a: { b: { c: 'd' } } };
      
      var finding = new Finding(schema, data);
      finding.byOperators('object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object);
      
      var finding = new Finding(schema, data);
      finding.byOperators('object', 'and');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object);
      
      var finding = new Finding(schema, data);
      finding.byOperators('object', 'and', 'props');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props);
      
      var finding = new Finding(schema, data);
      finding.byOperators('object', 'and', 'props', 'and', 'object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object);
      
      var finding = new Finding(schema, data);
      finding.byOperators('object', 'and', 'props', 'and', 'object', 'and', 'or', 'and', 'props', 'and', 'object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[1].props.b.object);
      
      var finding = new Finding(schema, data);
      finding.byOperators('object', 'and', 'props', 'and', 'object', 'and', 'or', 'and', 'props', 'and', 'string');
      assert.deepEqual(finding.fail, true);
      assert.deepEqual(finding.stack, []);
    });
    it('bySchema', function() {
      var schema = {
        object: {
          props: {
            a: {
              object: {
                or: [
                  {
                    props: {
                      b: {
                        number: true
                      }
                    }
                  },
                  {
                    props: {
                      b: {
                        object: {
                          props: {
                            c: {
                              string: true
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      };
      var data = { a: { b: { c: 'd' } } };
      var finding = new Finding(schema, data);
      finding.bySchema('object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[0]);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and', 'props');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[0].props);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and', 'props', 'b');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[0].props.b);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and', 'props', 'b', 'object');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[1].props.b.object);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and', 'props', 'b', 'object', 'props');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[1].props.b.object.props);
      
      var finding = new Finding(schema, data);
      finding.bySchema('object', 'props', 'a', 'object', 'or', 'and', 'props', 'b', 'object', 'props', 'c');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b.c);
      assert.deepEqual(finding.stack[finding.last].schema, finding.schema.object.props.a.object.or[1].props.b.object.props.c);
      
      var finding = new Finding(schema, data);
      finding.bySchema('string', 'props', 'a', 'object', 'or', 'and', 'props', 'b', 'object', 'props', 'c', 'boolean');
      assert.deepEqual(finding.fail, true);
      assert.deepEqual(finding.stack, []);
    });
    it('byData', function() {
      var schema = {
        object: {
          props: {
            a: {
              object: {
                or: [
                  {
                    props: {
                      b: {
                        number: true
                      }
                    }
                  },
                  {
                    props: {
                      b: {
                        object: {
                          props: {
                            c: {
                              string: true
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      };
      var data = { a: { b: { c: 'd' } } };
      var finding = new Finding(schema, data);
      
      finding.byData('a', 'b', 'c');
      assert.deepEqual(finding.fail, false);
      assert.deepEqual(finding.stack[finding.last].data, finding.data.a.b.c);
      
      finding.byData('a', 'b', 'c', 'e');
      assert.deepEqual(finding.fail, true);
      assert.deepEqual(finding.stack, []);
    });
  });
  describe('operators', function() {
    describe('undefined', function() {
      it('true', function() {
        var surfing = new Surfing({ undefined: true }, undefined);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ undefined: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'undefined'], schemaPath: ['undefined']}]);
      });
    });
    describe('boolean', function() {
      it('true', function() {
        var surfing = new Surfing({ boolean: true }, true);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
        var surfing = new Surfing({ boolean: true }, false);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ boolean: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'boolean'], schemaPath: ['boolean']}]);
      });
    });
    describe('null', function() {
      it('true', function() {
        var surfing = new Surfing({ null: true }, null);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ null: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'null'], schemaPath: ['null']}]);
      });
    });
    describe('nan', function() {
      it('true', function() {
        var surfing = new Surfing({ nan: true }, NaN);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ nan: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'nan'], schemaPath: ['nan']}]);
      });
    });
    describe('number', function() {
      it('true', function() {
        var surfing = new Surfing({ number: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ number: true }, 'abc');
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'number'], schemaPath: ['number']}]);
      });
    });
    describe('string', function() {
      it('true', function() {
        var surfing = new Surfing({ string: true }, 'abc');
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ string: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'string'], schemaPath: ['string']}]);
      });
    });
    describe('object', function() {
      it('true', function() {
        var surfing = new Surfing({ object: true }, {});
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
        var surfing = new Surfing({ object: true }, []);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ object: true }, 'abc');
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'object'], schemaPath: ['object']}]);
      });
    });
    describe('array', function() {
      it('true', function() {
        var surfing = new Surfing({ array: true }, []);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ array: true }, {});
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'array'], schemaPath: ['array']}]);
      });
    });
    describe('function', function() {
      it('true', function() {
        var surfing = new Surfing({ function: true }, function() {});
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ function: true }, {});
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'function'], schemaPath: ['function']}]);
      });
    });
    describe('and', function() {
      describe('object', function() {
        it('true', function() {
          var surfing = new Surfing({ and: { and: { and: { string: true } } } }, 'abc');
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ and: { and: { and: { string: true } } } }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and', 'string']}]);
        });
      });
      describe('array', function() {
        describe('object', function() {
          it('true', function() {
            var surfing = new Surfing([ { and: [ { string: true } ] } ], 'abc');
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { and: [ { string: true } ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and', 'string']}]);
          });
        });
        describe('string', function() {
          it('true', function() {
            var surfing = new Surfing([ { and: [ [ 'string' ] ] } ], 'abc');
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { and: [ [ 'string' ] ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'string'], schemaPath: ['and', 'and', 'and',  'string']}]);
          });
        });
        describe('function', function() {
          it('true', function() {
            var surfing = new Surfing([ { and: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { and: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 234);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'and', 'and', 'custom'], schemaPath: ['and', 'and', 'and',  'custom']}]);
          });
        });
      });
    });
    describe('or', function() {
      describe('object', function() {
        it('true', function() {
          var surfing = new Surfing({ or: { or: { or: { number: true, string: true, boolean: true } } } }, 'abc');
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ or: { or: { or: { number: true, string: true, boolean: true } } } }, []);
          surfing.travers();
          assert.deepEqual(surfing.errors, [
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'boolean'], schemaPath: ['or', 'or', 'or', 'boolean']},
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'string'], schemaPath: ['or', 'or', 'or', 'string']},
            {'error': undefined, operatorsPath: ['and', 'or', 'or', 'or', 'number'], schemaPath: ['or', 'or', 'or', 'number']},
          ]);
        });
      });
      describe('array', function() {
        describe('object', function() {
          it('true', function() {
            var surfing = new Surfing([ { or: [ { string: true } ] } ], 'abc');
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { or: [ { string: true } ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'string'], schemaPath: ['and', 'or', 'and', 'string']}]);
          });
        });
        describe('string', function() {
          it('true', function() {
            var surfing = new Surfing([ { or: [ [ 'string' ] ] } ], 'abc');
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { or: [ [ 'string' ] ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'string'], schemaPath: ['and', 'or', 'and', 'string']}]);
          });
        });
        describe('function', function() {
          it('true', function() {
            var surfing = new Surfing([ { or: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 123);
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing([ { or: [ [ function(surfing) { if (surfing.getData() != 123) surfing.throw(); } ] ] } ], 234);
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'and', 'or', 'and', 'custom'], schemaPath: ['and', 'or', 'and', 'custom']}]);
          });
        });
        describe('date', function() {
          it('true', function() {
            var surfing = new Surfing({ date: true }, new Date());
            surfing.travers();
            assert.deepEqual(surfing.errors, []);
          });
          it('false', function() {
            var surfing = new Surfing({ date: true }, 'abc');
            surfing.travers();
            assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'date'], schemaPath: ['date']}]);
          });
        });
      });
    });
    describe('props', function() {
      it('true', function() {
        var surfing = new Surfing({ props: { abc: { string: true } } }, { abc: 'cde' });
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
    });
    describe('custom', function() {
      it('true', function() {
        var surfing = new Surfing({ custom: function(surfing) { if (surfing.getData() != 123) surfing.throw(); } }, 123);
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ custom: function(surfing) { if (surfing.getData() != 123) surfing.throw(); } }, 456);
        surfing.travers();
        assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'custom'], schemaPath: ['custom']}]);
      });
    });
    describe('comparison', function() {
      describe('equal', function() {
        it('true', function() {
          var surfing = new Surfing({ equal: 123 }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ equal: 123 }, 456);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'equal'], schemaPath: ['equal']}]);
        });
      });
      describe('greater', function() {
        it('true', function() {
          var surfing = new Surfing({ greater: 123 }, 124);
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ greater: 123 }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'greater'], schemaPath: ['greater']}]);
        });
      });
      describe('less', function() {
        it('true', function() {
          var surfing = new Surfing({ less: 123 }, 122);
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ less: 123 }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'less'], schemaPath: ['less']}]);
        });
      });
      describe('min', function() {
        it('true', function() {
          var surfing = new Surfing({ min: 123 }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ min: 123 }, 122);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'min'], schemaPath: ['min']}]);
        });
      });
      describe('max', function() {
        it('true', function() {
          var surfing = new Surfing({ max: 123 }, 123);
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        });
        it('false', function() {
          var surfing = new Surfing({ max: 123 }, 124);
          surfing.travers();
          assert.deepEqual(surfing.errors, [{'error': undefined, operatorsPath: ['and', 'max'], schemaPath: ['max']}]);
        });
      });
    });
    describe('set', function() {
      it('root', function() {
        var surfing = new Surfing({ set: 456 }, 123);
        surfing.travers();
        assert.deepEqual(surfing.data, 456);
      });
      it('props', function() {
        var surfing = new Surfing({ props: { abc: { set: 456 } } }, { abc: 123 });
        surfing.travers();
        assert.deepEqual(surfing.data, { abc: 456 });
      });
      it('each', function() {
        var surfing = new Surfing({ each: { set: 456 } }, { abc: 123, bcd: 234, cde: 345 });
        surfing.travers();
        assert.deepEqual(surfing.data, { abc: 456, bcd: 456, cde: 456 });
      });
    });
    describe('default', function() {
      it('root', function() {
        var surfing = new Surfing({ default: 456 }, 123);
        surfing.travers();
        assert.deepEqual(surfing.data, 123);
        var surfing = new Surfing({ default: 456 }, undefined);
        surfing.travers();
        assert.deepEqual(surfing.data, 456);
        var surfing = new Surfing({ default: 456 }, null);
        surfing.travers();
        assert.deepEqual(surfing.data, 456);
        var surfing = new Surfing({ default: 456 }, 0);
        surfing.travers();
        assert.deepEqual(surfing.data, 456);
        var surfing = new Surfing({ default: 456 }, '');
        surfing.travers();
        assert.deepEqual(surfing.data, 456);
      });
      it('props', function() {
        var surfing = new Surfing({ props: { abc: { default: 456 } } }, { abc: undefined });
        surfing.travers();
        assert.deepEqual(surfing.data, { abc: 456 });
      });
      it('each', function() {
        var surfing = new Surfing({ each: { default: 234 } }, { abc: 123, bcd: undefined, cde: 345 });
        surfing.travers();
        assert.deepEqual(surfing.data, { abc: 123, bcd: 234, cde: 345 });
      });
    });
    describe('delete', function() {
      it('root', function() {
        var surfing = new Surfing({ delete: true }, 123);
        surfing.travers();
        assert.deepEqual(surfing.data, undefined);
      });
      it('props', function() {
        var surfing = new Surfing({ props: { abc: { delete: true } } }, { abc: 123, bcd: 234, cde: 345 });
        surfing.travers();
        assert.deepEqual(surfing.data, { bcd: 234, cde: 345 });
      });
      it('each', function() {
        var surfing = new Surfing({ each: { delete: true } }, { abc: 123, bcd: 234, cde: 345 });
        surfing.travers();
        assert.deepEqual(surfing.data, {});
      });
    });
    describe('each', function() {
      it('true', function() {
        var surfing = new Surfing({ each: { string: true } }, { a: 'abc', b: 'bcd', c: 'cde' });
        surfing.travers();
        assert.deepEqual(surfing.errors, []);
      });
      it('false', function() {
        var surfing = new Surfing({ each: { number: true } }, ['abc', 'bcd', 'cde']);
        surfing.travers();
        assert.deepEqual(surfing.errors, [
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
          var surfing = new Surfing({}, undefined);
          surfing.travers();
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
          var surfing = new Surfing({
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
          surfing.travers();
          assert.deepEqual(surfing.errors, []);
        }
    });
    }
  });
});