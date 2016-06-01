# Validation Groups

A validation group takes a model and ruleset and monitors the model to see if the validation concerns change
in any way and track errors as well as providing events to notify subscribers of validation changes.

## Creating Validation Groups

There are 2 main ways to create a validation group given the `Treacherous` object:

### createGroup(model: any, ruleset: Ruleset)

This takes the model and the ruleset to be applied to the model and returns the validation group. This is 
the most common way of creating a validationGroup and should be seen as the preferred way of usage as this
enforces you to isolate your ruleset creation logic.

```js
var ruleset = ...;
var model = ...;
var validationGroup = Treacherous.createGroup(model, ruleset);
```

### createGroupWithRules(model: any, rulesetGenerator: Function)

This approach allows you to create a group for a model based upon a generator method you provide, this is
mainly for users who may have a slight deviation on the normal validation rules or just want to inline
their rules for creation of the group.

```js
var model = ...;
var validationGroup = Treacherous.createGroupWithRules(model, function(rulesetBuilder){ 
    return rulesetBuilder
        .forProperty("foo")
            .addRule("required")
        .build();
});
```

You can also separate out your ruleset logic into its own method and expose it like so:

```js
function createModelRuleset(rulesetBuilder){ 
    return rulesetBuilder
        .forProperty("foo")
            .addRule("required")
        .build();
}

var model = ...;
var validationGroup = Treacherous.createGroupWithRules(model, createModelRuleset);
```

---

## Using Validation Groups

There are a few different ways to get validation information, you can subscribe to events and react 
to validation concerns as they update, or you can just query the group for all outstanding errors.

This satisfies the 2 main use cases of having a front end reacting to errors as they occur or having 
a button which triggers validation to see what has changed.

### Check current validity
```js
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

validationGroup.isValid()
    .then(function(isValid){
        // true is valid, false is invalid
    ));
```

### Get current validation errors
```js
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

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
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

validationGroup.getPropertyError("somePropertyName")
    .then(function(propertyError){
        /*
            propertyError is a either a string containing the error or undefined
        */
    ));
```

### Subscribe to per property validation changes
```js
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

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
var validationGroup = Treacherous.createGroup(simpleModel, ruleset);

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

### Hot swapping model

So if you need to for some reason entirely replace the model you are observing with another instance but 
of the same type (i.e push notifications of new data to replace existing, API callbacks etc) you can
make use of the `changeValidationTarget` method on the validation group.

This will let you put in a new model for validating without having to do any additional setup, so the
same rules, watchers etc will all be used under the hood, and as the scheme matches it is really just
changing from looking at one object to another and should work seamlessly.

```
var validationGroup = createGroup({ someProperty: 10}, rulesetForObject);
validationGroup.changeValidationTarget({ someProperty: 100 });
```

One thing to be aware of is that it will be treated like any data change in the model, so when you 
hot swap the current model it will re-validate and check for changes automatically.