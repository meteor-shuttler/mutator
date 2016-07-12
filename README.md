# Surfing

Realy simple and customizable schemas without recursion.

## Install

```
npm install --save surfing
```

## Tasks

- [x] Surfing by schema, data and stack in single while without recursion (./surfing.js)
- [x] Validation on single while with error throwing support (./validating.js)
- [x] Temp tests for surfing and validating (./tests.js)
- [x] And operator (./operators/and.js)
- [x] Or operator (./operators/or.js)
- [x] Props operator (./operators/props.js)
- [x] Each operator (./operators/each.js)
- [x] Undefined operator (./operators/undefined.js)
- [x] Null operator (./operators/null.js)
- [x] NaN operator (./operators/nan.js)
- [x] Custom operator (./operators/custom.js)
- [x] Boolean operator (./operators/boolean.js)
- [x] Number operator (./operators/number.js)
- [x] String operator (./operators/string.js)
- [x] Object operator (./operators/object.js)
- [x] Array operator (./operators/array.js)
- [x] Function operator (./operators/function.js)
- [x] Add pathSchema and pathData to stack.
- [x] Equal operator (./operators/equal.js)
- [x] Set data (./operators/set.js)
- [x] Delete data (./operators/delete.js)
- [x] Default data (./operators/default.js)
- [x] Operators tests (./tests.js)
- [x] Performance tests (./tests.js)
- [x] Comparison operators
- [x] Operator regex
- [x] Full array support for and/or operators (./operators/and.js) (./operators/or.js)
- [ ] Lazy surfing, incomplete errors
- [ ] Search in scheme by path (./finder.js)
- [ ] npm publish
- [ ] API documentation
- [ ] Examples
- [ ] Compare the performance with SimpleSchema/node-schema-object/js-schema

## Versions

### 0.0.0-alpha.5
* Support for array and/or difinition

### 0.0.0-alpha.4
* Comparison and regex operators

### 0.0.0-alpha.3
* pathSchema and pathData added to stack
* Operators: equal, set, delete, default
* Fix many operator's bugs

### 0.0.0-alpha.2
* Operators: null, nan, custom and each
* Remove temp comments

### 0.0.0-alpha.1
* Fix "or" bug
* Operators tests
* Performance tests

### 0.0.0-alpha.0
* Initial commit
* Simple surfing class
* Validation surfing class