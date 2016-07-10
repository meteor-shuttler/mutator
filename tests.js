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
});