# Treacherous

There are LOTS of validation frameworks out currently, some synchronous, some are async, 
some work off the DOM some work off models. Some of them are tied to specific front end frameworks, 
others are mainly for the node world.

However in most cases you will be hard pressed to find a easy to use async based one which is 
agnostic of frameworks/platforms but can be plugged into them. This was the idea behind Treacherous, 
a simple validation framework which could be shared between browser and server as well as 
being able to expose MVVM style subscriptions for other frameworks to hook into.

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
can write your validation rules once, and consume them anywhere (that has a compatible binding layer)..

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
        .addRule("maxLength, 5)     // The property neds a length <= 5
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

validationGroup.isValid()
    .then(function(isValid){
        console.log(isValid); // should write false
    });

validationGroup.getErrors()
    .then(function(errors){
        console.log(errors); // should contain { "foo[2]": "<some error about max value>" }
    });
```

## Validation Rules

The framework comes with built in validators for the following:

* `date`        - The value is expressible as a date
* `decimal`     - The value is expressible as a float/single
* `email`       - The value conforms to a valid email address
* `equal`       - The value is equal to another value
* `iso-date`    - The value conforms to a valid ISO date format
* `max-length`  - The value must have a length <= value
* `max-value`   - The value must have a value <= value
* `min-length`  - The value must have a length >= value
* `min-value`   - The value must have a value >= value
* `not-equal`   - The value is not equal to another value
* `number`      - The value is expressible as an integer
* `regex`       - The value matches the regex pattern
* `required`    - The value is not a null-like value
* `step`        - The value conforms to the numeric steps provided

### Creating Custom Rules

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