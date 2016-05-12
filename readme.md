# Treacherous

A modern async validation system to be used on the server or in the browser as well as with or without 
view frameworks.

It is an attempt to bring some consistency to validation in the javascript world you can write your 
validation rules in a single way a single time and re-use it anywhere you want without worrying about
each framework/platforms many different validation paradigms or libraries.

## Features / Benefits

- Fully async validation`*`
- Separation of rules and validation allowing composable rulesets
- Supports nested complex objects/arrays
- Outside in validation, does not augment your models in any way
- Can be integrated with any front end framework`**`
- Works in browser or server

`*` = Currently has a hard dependency on bluebird (looking to refactor out going forward), and incorrect validation does not reject promises (this was a design decision but is open to discussion.)

`**` = Currently supports [knockout](https://github.com/grofit/treacherous-knockout), [aurelia] (https://github.com/grofit/treacherous-aurelia), others coming soon.

---

## Installing

### Via NPM

Just do an `npm install treacherous`

### In browser

There are a few different flavours in the dist directory for the browser ([read more here](docs/installing.md)).

- If you have a module aware framework in your browser use `treacheous.js`
- If you are running without modules then include either `treacherous.browser.js` or `treacherous.all.js`

The difference between the two latter ones is that one requires you to include ([event-js](https://github.com/grofit/eventjs) and [property-resolver](https://github.com/grofit/property-resolver)), 
however the `all` one has those bundled in, for most instances use the browser one and include the other 2 files.

In non module aware scenarios it will self register the `Treacherous` global var for you.

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
    
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

validationGroup.isValid()
    .then(function(isValid){
        console.log(isValid); // should write true
    });
```

### Validating simple arrays in models

```js
var simpleModel = {
    foo: [10, 20, 30]
};

var ruleset = Treacherous.createRuleset()
    .forProperty("foo")
        .addRule("maxLength", 5)        // The array can only contain <= 5 elements
        .addRuleForEach("maxValue", 20) // Each element needs a value <= 20
    .build();
    
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

validationGroup.getModelErrors()
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
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

validationGroup.isValid()
    .then(function(isValid){
        // true is valid, false is invalid
    ));
```

### Get all errors
```js
var validationGroup = Treacherous.createGroup(...);

validationGroup.getModelErrors()
    .then(function(propertyErrors){...));
```

### Subscribe validation changes
```js
var validationGroup = Treacherous.createGroup(...);

validationGroup.propertyStateChangedEvent.subscribe(function(propertyValidationChangedEvent){...));
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

### Creating custom rules

So if you want to make your own rule you need to do 2 things, one is create the rule handler class
which should conform to the `IValidationRule` interface, once you have done the validator you then need to register it so the validation system is aware of it,
to do that you need to call `Treacherous.ruleRegistry.registerRule(new SomeCustomValidator());`.

To find out more read the [Custom Rules](docs/custom-rules.md) docs.

--- 

## Documentation

Just look in the `docs` folder for more documentation on certain scenarios or subject matters.

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

---

## Why should I use it?

There are LOTS of validation frameworks out currently, some synchronous, some are async, 
some work off the DOM some work off models. Some of them are tied to specific front end frameworks, 
others are mainly for the node world.

However in most cases you will be hard pressed to find a easy to use async based one which is 
agnostic of frameworks/platforms but can be plugged into them. This was the idea behind Treacherous, 
a simple validation framework which could be shared between browser and server as well as 
being able to expose MVVM style subscriptions for other frameworks to hook into.

If you share code between multiple worlds (i.e nodejs, browser, mobile) then you may have had
issues before where you are tied into a specific framework for your front ends and want to 
re-use your models in the back end as a contractual layer or something. In these cases 
you often either end up maintaining 2 sets of validation which is ok, but it could be better, 
and this is where Treacherous attempts to improve this approach.

It is also useful for libraries which contain pure data concerns and have no notion 
of front end frameworks, so you may have one central library and have one front end
using ng and one front end using aurelia or knockout for different devices etc. 
In this case you can have validation as a pure data concern and just plug the validation 
logic into your MVVM framework so it will automatically listen for the validation concerns 
letting you re-use more of your code base in a more consistent way.

Ultimately each framework tends to have it's own validation system, but with Treacherous you 
can write your validation rules once, and consume them anywhere (that has a compatible binding layer).
