# Treacherous

There are LOTS of validation frameworks out currently, some synchronous, some are async, 
some work off the DOM some work off models. Some of them are tied to specific front end frameworks, 
others are mainly for the node world.

However in most cases you will be hard pressed to find a easy to use async based one which is 
agnostic of frameworks/platforms but can be plugged into them. This was the idea behind Treacherous, 
a simple validation framework which could be shared between browser and server as well as 
being able to expose MVVM style subscriptions for other frameworks to hook into.

## Installing

### Via NPM

Just do an `npm install treacherous`

### In browser

There are 4 flavours in the dist dir:

* `treacherous.all.js`      - Contains treacherous and all dependencies (including bluebird)
* `treacherous.minimal.js`  - Contains only treacherous and no dependencies
* `treacherous.js`          - Contains treacherous dependencies without bluebird
* `treacherous.browser.js`  - Contains treacherous which works without modules for browser usage

The reason there are 4 flavours is because some people will use this in a non-module aware
browser scenario, and `treacherous.all.js` will contain everything for it to just work, it is also
used by the unit tests in the project.

`treacherous.minimal.js` is purely just the treacherous library without any dependencies, this is
the most modular version of the package and what the `package.json` defaults to. However there 
are 2 dependencies to other libraries I have written which were originally part of this but 
were split out for re-use, however I am aware most people will not use them outside of here, so
this is where the last version comes from.

`treacherous.js` contains the 2 custom modules that are required for this library 
([event-js](https://github.com/grofit/eventjs), [property-resolver](https://github.com/grofit/property-resolver)), 
without you needing to include them, as chances are if you are using this you already have bluebird
or some other promise library included so dont want it bundled with this.

`treacherous.browser.js` is same as `treacherous.minimal.js` but it does not know of modules, so it 
requires you to include `bluebird` and the other 2 packages in the page somewhere.
([event-js](https://github.com/grofit/eventjs), [property-resolver](https://github.com/grofit/property-resolver)), 

## How do I use it

In the browser it will self register the `Treacherous` global, however in node or module aware
environments its up to you how you include it, but it will expose the same object for you.

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
    
var validationGroup = Treacherous.create(simpleModel, ruleset);

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
    
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.getModelErrors()
    .then(function(errors){
        console.log(errors); // should contain { "foo[2]": "<some error about max value>" }
    });
```

## Validation State

You can manually call the validation group to confirm the validation state, you can also subscribe 
to be notified when validation changes occur, allowing you to reactively handle validation changes.

For the examples below imagine the model and ruleset are already set.

### Check current validity
```js
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.isValid()
    .then(function(isValid){
        // true is valid, false is invalid
    ));
```

### Get current validation errors
```js
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.getModelErrors()
    .then(function(propertyErrors){
        /*
            propertyErrors is a json object with the name of the property per error.
            
            So for example if you had a property called foo which was required and had failed
            then you would be passed back the error structure:
            
            {
                "foo": "some error message here"
            }
            
            You will only get the most recent validation error as the library will stop processing
            after the first failure. Also another thing to keep in mind is that the validation field
            will contain the property route, not just the actual property.
            
            So for example if you had an object called foo, which contained the property bar which was
            and array and the second element had failed validation you would get back the error structure:
            
            {
                "foo.bar[1]": "some error message here"
            }
            
            It is recommended that you process these errors in a for loop as you never know what
            will be in there:
            
            for(var relatedPropertyName in propertyErrors) { ... }
        */
    ));
```

### Get current validation errors for a property
```js
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.getPropertyError("somePropertyName")
    .then(function(propertyError){
        /*
            propertyError is a either a string containing the error or undefined
        */
    ));
```

### Subscribe to per property validation changes
```js
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.propertyStateChangedEvent.subscribe(function(propertyValidationChangedEvent){
    /*
        The propertyValidationChangedEvent is of type PropertyValidationChangedEvent
        and contains the following fields:
        
        {
            property: string,   // The property/route which has failed, i.e 'foo' or 'foo.bar[2].woo'
            isValid: boolean,   // The validation state
            error?: string      // The error message if isValid is false
        }
        
        The event is only raised when the validation state of a property changes, however if a property
        is invalid and then it changes and is still invalid but for a different reason this event would
        be triggered but the error string would be different.
    */
));
```

### Subscribe to model validation changes
```js
var validationGroup = Treacherous.create(simpleModel, ruleset);

validationGroup.modelStateChangedEvent.subscribe(function(validationStateChangedEvent){
    /*
        The validationStateChangedEvent is of type ValidationStateChangedEvent
        and contains the following fields:
        
        {
            isValid: boolean,   // The validation state
        }
        
        The event is only raised when the validation state of a model changes, so if a single
        property has an error, then suddenly 20 properties have an error no event will be sent
        until the model is all valid.
    */
));
```

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
which should conform to the `IValidationRule` interface, which in raw JS would conform to this:

```
function SomeCustomValidator()
{
    this.ruleName = "someRuleName";    

    this.validate = function(value, options)
    {
        return Promise.resolve(true);
    }

    this.getMessage = function(value, options) {
        return `some message`;
    }
}
```

To provide some more information on each property:

* `ruleName`    - The name of the rule to be used within the `addRule` statements
* `validate`    - The validation method where you should verify the value and return a promise with true/false
* `getMessage`  - The getMessage method should return a string providing information related to the validation error

Once you have done the validator you then need to register it so the validation system is aware of it,
to do that you need to call `Treacherous.ruleRegistry.registerRule(new SomeCustomValidator());`.

### Translations

This is a todo, if needed this will probably be implemented by having a class representing the 
validation message for a given language linked via the `ruleName` for now all messages are in 
english but feel free to raise this if you need this functionality sooner rather than later.

## Developing

If you want to develop it further just clone the repo, `npm install` and `gulp` it should then provide you 
a working version to play with. If you want to minify it you can do `gulp minify` which will minify the
output files, we don't minify by default.

You can also run `gulp run-tests` which will run the tests to make sure everythign works as expected.

## Why should I use it?

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