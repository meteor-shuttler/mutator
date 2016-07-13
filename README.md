# Surfing

Realy simple and customizable schemas without recursion.

[![Build Status](https://travis-ci.org/meteor-shuttler/surfing.svg?branch=master)](https://travis-ci.org/meteor-shuttler/surfing)

- [x] Multivariant typing
- [x] Super fast one while implementation
- [x] Custom operators

## Install

```
npm install --save surfing
```

## Example

```js
// Example of custom DBRef/simple number pointer to some document
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
      source: ref,
      target: ref
    }
  }
}, {
  source: { id: '507f1f77bcf86cd799439011', collection: 'users' },
  target: 12345
});
surfing.travers();
surfing.errors.length; // 0
```

## Documentation

### Surfing
> var Surfing = require('surfing');
> var surfing = new Surfing(schema?: Schema, data?: any, options?: Options);

Constructor for a one surfing instance.

#### travers
> surfing.travers();

Run travers by the scheme and data.

#### errors
> surfing.errors: [{ error?: any, schemaPath: [any], dataPath: [any], operatorsPath: [any] }]

Stores error if they throwed as a result of the traversing.

### Finding
> var Finding = require('surfing/finding');
> var finding = new Surfing(schema?: Schema, data?: any, options?: Options);

Targeted traversing of the tree in search of appropriate path.

#### byOperators
> finding.byOperators(...path: [any]) => finding

Find stack level by operators path.
Set `finding.fail = true` if the search failed.

#### bySchema
> finding.bySchema(...path: [any]) => finding

Find stack level by schema path.
Set `finding.fail = true` if the search failed.

#### byData
> finding.byData(...path: [any]) => finding

Find stack level by data path.
Set `finding.fail = true` if the search failed.

### Options
> Object

Global settings for surfing instance.

#### dictionary
> Object?: Surfing.dictionary

In this option you can set a custom dictionary operators.

#### details
> Boolean?: true

Defines the detail of error when traversing.

* `true` by default, all errors will be saved, all paths will be traversed
* `false`, `and` operator will stop after the first error, `or` operator throws one's own error

#### execute
> Boolean?: true

It allows you to disable validation on traversing. By default is enabled.

## Operators

#### and

###### Object syntax
```js
{
  string: true,
  custom: function(surfing) {/* do something */}
}
```

###### Array syntax
```js
[
  'string',
  function(surfing) {/* do something */}
]
```

#### or

###### Object syntax
```js
{
  string: true,
  number: true
}
```

###### Array syntax
```js
[
  'string',
  'number'
]
```

#### props
Allows accurately move stack to a specific key in the data

```js
var data = {
  abc: 123
};
var schema = {
  object: {
    props: {
      abc: {
        number: {
          equal: 123
        }
      }
    }
  }
}
```

#### each
It allows you to apply a description to all content.

```js
var data = {
  abc: 123,
  cde: 123
};
var schema = {
  object: {
    each: {
      number: {
        equal: 123
      }
    }
  }
}
```

### Typing

All operators of typing take `and` operator as scheme.

```js
{
  string: {
    min: 10,
    max: 30
  },
  number: {
    greater: 15
  }
}
```

#### undefined

#### boolean

#### null

#### nan

#### number

#### string

#### object

#### array

#### function

### Comparison

Applicable for strings, numbers or arrays.

```js
{
  or: {
    string: {
      equal: 'abc'
    },
    number: {
      greater: 3,
      less: 31
    },
    array: {
      min: 3,
      max: 30
    }
  }
}
```

#### equal

#### greater

#### less

#### min

#### max

### Actions

#### set
It allows to set value under certain conditions.

```js
var data = {
  abc: 123
};
var schema = {
  object: {
    props: {
      abc: {
        number: {
          set: 234
        }
      }
    }
  }
}
var surfing = new Surfing(schema, data);
surfing.travers();
surfing.data.abc; // 234
```

#### delete
It allows to delete value under certain conditions.

```js
var data = {
  abc: 123
};
var schema = {
  object: {
    props: {
      abc: {
        number: {
          delete: true
        }
      }
    }
  }
}
var surfing = new Surfing(schema, data);
surfing.travers();
surfing.data; // {}
```

#### default
It sets the value if it did not exist before.

```js
var data = {};
var schema = {
  object: {
    props: {
      abc: {
        default: 123,
        number: {
          max: 234
        }
      }
    }
  }
}
var surfing = new Surfing(schema, data);
surfing.travers();
surfing.data; // { abc: 123 }
```

#### custom
Performs a custom action.

###### Object syntax
```js
{
  custom: function(surfing) {
    if (surfing.getData() == 123)
      surfing.throw('My custom error');
  }
}
```

###### Array syntax
```js
[
  function(surfing) {
    if (surfing.getData() == 123)
      surfing.throw('My custom error');
  }
]
```

#### regex
Verify with regular expression.

```js
{
  regex: /^\d+$/
}
```

## Versions

### 0.0.0
* Search in scheme by path
* Merge Validation into Surfing class
* Documentation

### 0.0.0-alpha.6
* Options for `Surfing` and `Validating` classes
* Move dictionary and handler to options
* Default dictionary
* Option `details?: boolean = true`

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