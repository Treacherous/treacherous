# Treacherous

A modern async validation framework with a raft of features for node or the browser.

![treacherous-image](https://user-images.githubusercontent.com/927201/29661471-03b5ee16-88bc-11e7-880d-d8c027b264c8.png)

[![Build Status][build-status-image]][build-status-url]
[![Npm Version][npm-version-image]][npm-version-url]
[![Npm Downloads][npm-downloads-image]][npm-version-url]
[![Join Gitter Chat][gitter-image]][gitter-url]

Treacherous is an attempt to bring some consistency to validation in the javascript world, allowing you to write your validation rules for your models once, and re-use them on any platform with any framework.

## Benefits

- Fully async validation
- Separation of rules and validation allowing composable rule sets
- Supports nested complex objects/arrays
- Outside in validation, does not augment your models in any way
- Works in browser or server
- Write once, use anywhere
- Can be integrated with any view framework (i.e vue, knockout, aurelia etc)
- Generic pipeline for localization customization

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
import {createRuleset, createGroup} from "treacherous";

const simpleModel = {
    foo: 20,
    bar: "hello"
};

const ruleset = createRuleset()
    .forProperty("foo")
        .addRule("required")        // The property is required
        .addRule("maxValue", 20)    // The property needs a value <= 20
    .forProperty("bar")
        .addRule("maxLength", 5)     // The property neds a length <= 5
    .build();
    
const validationGroup = createGroup()
    .build(simpleModel, ruleset);

validationGroup.validate()
    .then((isValid) => {
        console.log(isValid); // should write true
    });
```

### Ruleset Shorthand
```js
const ruleset = createRuleset()
    .forProperty("foo")
        .required()
        .maxValue(20)
    .forProperty("bar")
        .maxLength(5)
    .build()
```

### Validating simple arrays in models

```js
const simpleModel = {
    foo: [10, 20, 30]
};

const ruleset = createRuleset()
    .forProperty("foo")
        .addRule("maxLength", 5)        // The array can only contain <= 5 elements
        .addRuleForEach("maxValue", 20) // Each element needs a value <= 20
    .build();
    
const validationGroup = createGroup()
    .build(simpleModel, ruleset);

validationGroup.getModelErrors(true) // the true value indicates a full revalidation
    .then((errors) => {
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
const validationGroup = createGroup()
    .build(...);

validationGroup.validate()
    .then((isValid) => {
        // true is valid, false is invalid
    ));
```

### Get all errors
```js
const validationGroup = createGroup()
    .build(...);

validationGroup.getModelErrors()
    .then((propertyErrors) => {...));
```

### Subscribe validation changes
```js
const validationGroup = createGroup()
    .build(...);

validationGroup.propertyStateChangedEvent.subscribe((propertyValidationChangedEvent) => {...));
```

## Typescript users

As typescript users you can get some nicer features and intellisense so you can create typed rules allowing 
you to use lambda style property location like so:

```ts
const ruleset = createRuleset<SomeModel>()
    .addProperty(x => x.SomeProperty)
        .required()
        .matches(x => x.SomeOtherProperty)
    .build();
```

You can also make use of `async/await` for almost all async methods like so:

```ts
const modelErrors = await validationGroup.getModelErrors();
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

Creating custom rules is pretty easy, you need to:

- Implement `IValidationRule` with your custom logic (JS users just match the signatures of the interface)
- Add validation messages for supported locales
- Register your rule with the ruleRegistry

There is a whole doc on the subject which can be found in the docs section.

--- 

### Localization

There is a whole doc on the subject, but at a high level *BY DEFAULT* treacherous will pre-load the `en-us` locale for you which will be used by the library, but you can easily supplement that locale, or register and use new locales. You can also completely replace the default localization handler, but see the docs for more info on this.

---

## Documentation

Just look in the `docs` folder for more documentation on certain scenarios or subject matters.

[DOCS ARE HERE](https://github.com/grofit/treacherous/tree/master/docs)

---

## Related Libraries

This library is the core treacherous framework, which purely handles the validation of models, however there are a few other libraries which build on top of this such as:

- [treacherous-decorators](https://github.com/grofit/treacherous-decorators) (Allows validation rules to be defined by decorators i.e `@withRule(..)`)

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

---

## Credits

"Mountains" Icon courtesy of [The Noun Project](https://thenounproject.com/), by Aleksandr Vector, under [CC 3.0](http://creativecommons.org/licenses/by/3.0/us/)

[build-status-image]: https://travis-ci.org/Treacherous/treacherous.svg?branch=master
[build-status-url]: https://travis-ci.org/Treacherous/treacherous
[gitter-image]: https://badges.gitter.im/grofit/treacherous.svg
[gitter-url]: https://gitter.im/grofit/treacherous
[npm-version-image]: https://badge.fury.io/js/treacherous.svg
[npm-version-url]: https://www.npmjs.com/package/treacherous
[npm-downloads-image]: https://img.shields.io/npm/dm/treacherous.svg?maxAge=2592000
