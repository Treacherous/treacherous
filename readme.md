# Treacherous

A modern async validation system to be used on the server or in the browser as well as with or without 
view frameworks.

[![Build Status][build-status-image]][build-status-url]
[![Npm Version][npm-version-image]][npm-version-url]
[![Npm Downloads][npm-downloads-image]][npm-version-url]
[![Join Gitter Chat][gitter-image]][gitter-url]

It is an attempt to bring some consistency to validation in the javascript world you can write your 
validation rules in a single way a single time and re-use it anywhere you want without worrying about
each framework/platforms many different validation paradigms or libraries.

## Benefits

- Fully async validation
- Separation of rules and validation allowing composable rule sets
- Supports nested complex objects/arrays
- Outside in validation, does not augment your models in any way
- Works in browser or server
- Can be integrated with any view framework (i.e vue, knockout, aurelia etc)


## Features

### Reactive Validation

Treacherous can optionally watch your model to see if any properties it is validating change and automatically re-validate those fields when changed, even in nested objects or arrays.

### Composite Rules / Virtual Properties

Support for validating at property level using normal rules or for creating composite rules which are applied at the model level, allowing you to validate multiple properties within the same context.

### Predicate Based Validation

You can specify predicates to only apply certain validation rules when criteria are met allowing your model validity to be contextual and flexible.

### Property Alias'

This is mainly for when you are using treacherous within the browser, but you can provide alias' to properties so when errors are reported the property alias is displayed rather than the actual property name, as who wants to see `hasConfirmedTermsAndConditions` when you could just alias that field as `T&Cs`.

### Full Support for Typescript

The whole of Treacherous was written in typescript and can bring some nice time saving features to typescript users like `async/await` and lambda style interactions.

Don't worry if you dont use/like typescript, you can still use all of treacherous' features as if it were a native javascript framework.

---

## Installing

By default the module is exposed as a `commonjs` module, however the dist folder also contains support for `amd` and `system` module types.

### Via NPM

Just do an `npm install treacherous`

### In browser

As this is distributed as a commonjs module it is recommended that you consume it via your existing module 
loader, or in the scenario where you do not have one it is recommended that you use webpack to just package 
it up as a UMD module to consume with a global name, this may automatically happen when typescript 2.0 provides 
this functionality for UMD modules out of the box.

---

## Simple Examples

### Validating simple models

```js
var simpleModel = {
    foo: 20,
    bar: "hello"
};

var ruleset = Treacherous.createRuleset()
    .forProperty("foo")
        .addRule("required")        // The property is required
        .addRule("maxValue", 20)    // The property needs a value <= 20
    .forProperty("bar")
        .addRule("maxLength", 5)     // The property neds a length <= 5
    .build();
    
var validationGroup = Treacherous.createGroup()
    .build(simpleModel, ruleset);

validationGroup.validate()
    .then(function(isValid){
        console.log(isValid); // should write true
    });
```

### Validating simple arrays in models

```js
var Treacherous = require("treacherous");

var simpleModel = {
    foo: [10, 20, 30]
};

var ruleset = Treacherous.createRuleset()
    .forProperty("foo")
        .addRule("maxLength", 5)        // The array can only contain <= 5 elements
        .addRuleForEach("maxValue", 20) // Each element needs a value <= 20
    .build();
    
var validationGroup = Treacherous.createGroup()
    .build(simpleModel, ruleset);

validationGroup.getModelErrors(true) // the true value indicates a full revalidation
    .then(function(errors){
        console.log(errors); // should contain { "foo[2]": "<some error about max value>" }
    });
```

---

## Creating Validation Groups

The validation group is the object which manages validation state, you can find out a lot more
information on this within the [docs](docs/validation-groups.md).

Here are a few simple examples to save you trawling the docs.

### Check current validity
```js
var validationGroup = Treacherous.createGroup()
    .build(...);

validationGroup.validate()
    .then(function(isValid){
        // true is valid, false is invalid
    ));
```

### Get all errors
```js
var validationGroup = Treacherous.createGroup()
    .build(...);

validationGroup.getModelErrors()
    .then(function(propertyErrors){...));
```

### Subscribe validation changes
```js
var validationGroup = Treacherous.createGroup()
    .build(...);

validationGroup.propertyStateChangedEvent.subscribe(function(propertyValidationChangedEvent){...));
```

## Typescript users

As typescript users you can get some nicer features and intellisense so you can create typed rules allowing 
you to use lambda style property location like so:

```ts
var ruleset = Treacherous.createRuleset<SomeModel>()
    .addProperty(x => x.SomeProperty)
    .addRule("required")
    .build();
```

You can also make use of `async/await` for almost all async methods like so:

```ts
let modelErrors = await validationGroup.getModelErrors();
console.log(modelErrors);
```

---

## Validation rules

The framework comes with built in validators for the following:

* `date`        - The value is expressible as a date
* `decimal`     - The value is expressible as a float/single
* `email`       - The value conforms to a valid email address
* `equal`       - The value is equal to another value
* `isoDate`    - The value conforms to a valid ISO date format
* `maxLength`  - The value must have a length <= value
* `maxValue`   - The value must have a value <= value
* `minLength`  - The value must have a length >= value
* `minValue`   - The value must have a value >= value
* `notEqual`   - The value is not equal to another value
* `number`      - The value is expressible as an integer
* `regex`       - The value matches the regex pattern
* `required`    - The value is not a null-like value
* `step`        - The value conforms to the numeric steps provided
* `matches`     - The value must match another property in the model

### Creating custom rules

So if you want to make your own rule you need to do 2 things, one is create the rule handler class
which should conform to the `IValidationRule` interface, once you have done the validator you then need to register it so the validation system is aware of it,
to do that you need to call `Treacherous.ruleRegistry.registerRule(new SomeCustomValidator());`.

To find out more read the [Custom Rules](docs/custom-rules.md) docs.

--- 

## Documentation

Just look in the `docs` folder for more documentation on certain scenarios or subject matters.

[DOCS ARE HERE](https://github.com/grofit/treacherous/tree/master/docs)

---

## Related Libraries

This library is the core treacherous framework, which purely handles the validation of models, however there are a few other libraries which build on top of this such as:

- [treacherous-view](https://github.com/grofit/treacherous-view) (Convention based classes for view framework integration)

- [treacherous-knockout](https://github.com/grofit/treacherous-knockout) (Knockout bindings for treacherous)

- [treacherous-vue](https://github.com/grofit/treacherous-vue) (Vue plugin for treacherous)

- [treacherous-aurelia](https://github.com/grofit/treacherous-aurelia) (Aurelia plugin for treacherous)

---

## Developing

If you want to develop it further just clone the repo, `npm install` and `gulp` it should then provide you 
a working version to play with. If you want to minify it you can do `gulp minify` which will minify the
output files, we don't minify by default.

You can also run `gulp run-tests` which will run the tests to make sure everythign works as expected.

### Translations

This is a todo, if needed this will probably be implemented by having a class representing the 
validation message for a given language linked via the `ruleName` for now all messages are in 
english but feel free to raise this if you need this functionality sooner rather than later.


[build-status-image]: https://travis-ci.org/grofit/treacherous.svg
[build-status-url]: https://travis-ci.org/grofit/treacherous
[gitter-image]: https://badges.gitter.im/grofit/treacherous.svg
[gitter-url]: https://gitter.im/grofit/treacherous
[npm-version-image]: https://badge.fury.io/js/treacherous.svg
[npm-version-url]: https://www.npmjs.com/package/treacherous
[npm-downloads-image]: https://img.shields.io/npm/dm/treacherous.svg?maxAge=2592000
