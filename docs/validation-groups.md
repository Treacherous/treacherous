# Validation Groups

There are 2 kinds of validation groups available in treacherous, one is reactive and will monitor the 
model you provide and automatically run validation rules as the values change, the other is a non-reactive 
validation group which will only trigger rules when you explicitly tell it to.

Both group types share the same methods so if you dont need to automatically react to model changes
you do not need to use it, however if you do its just extra functionality you get for free.

Whichever type you pick, they both take a model and ruleset and will provide errors by the property route.

## Creating Validation Groups

The group is exposed by the `Treacherous` object and no matter how you consume it you will always start 
with `createGroup` and you will end with `build(model, ruleset)`, this will then return back the instance
for you to use, however you can cusomize how it is built as shown below.

### Basic validation group creation

Most basic setup

```js
var ruleset = ...;
var model = ...;
var validationGroup = Treacherous.createGroup()
    .build(model, ruleset);
```

### Reactive validation group creation

You can also customize how the validation group is created, so if you want a reactive validation group
you can easily request it:

```js
var ruleset = ...;
var model = ...;
var validationGroup = Treacherous.createGroup()
    .asReactiveGroup()
    .build(model, ruleset);
```

### Validate the model on start

By default Treacherous will wait for you to tell it when to validate (unless you are using a reactive group),
however if you want to tell it to do this just specify it:

```js
var ruleset = ...;
var model = ...;
var validationGroup = Treacherous.createGroup()
    .andValidateOnStart()
    .build(model, ruleset);
```

### Other builder methods

Here are all the currently available builder methods:

* `andValidateOnStart`          - Validate the model automatically when the group is created
* `withModelResolverFactory`    - Specify your own implementation of `IModelResolverFactory`
* `asReactive`                  - Build a `ReactiveValidationGroup` instead of a `ValidationGroup`
 * `withRefreshRate`            - Specify how fast the reactive monitor should refresh
 * `withModelWatcherFactory`    - Specify your own implementation of `IModelWatcherFactory`

---

## Using Validation Groups

There are a few different ways to get validation information, if you are using a reactive group 
you can subscribe to events and react to validation concerns as they update, or you can just query 
the group for all outstanding errors.

This satisfies the 2 main use cases of having a front end reacting to errors as they occur or having 
a button which triggers validation to see what has changed.

### Check current validity
```js
var validationGroup = ...;

validationGroup.validate()
    .then(function(isValid){
        // true is valid, false is invalid
    ));
```

### Get current validation errors
```js
var validationGroup = ...;

validationGroup.getModelErrors(true) // If you don't pass true it wont revalidate and just take current state
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
var validationGroup = ...;

validationGroup.getPropertyError("somePropertyName", true) // omit true to not force revalidation
    .then(function(propertyError){
        /*
            propertyError is a either a string containing the error or undefined
        */
    ));
```

### Subscribe to per property validation changes

```js
var reactiveValidationGroup = ...;

reactiveValidationGroup.propertyStateChangedEvent.subscribe(function(propertyValidationChangedEvent){
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
var reactiveValidationGroup = Treacherous.createGroup(simpleModel, ruleset);

reactiveValidationGroup.modelStateChangedEvent.subscribe(function(validationStateChangedEvent){
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
var validationGroup = createGroup().build({ someProperty: 10}, rulesetForObject);
validationGroup.changeValidationTarget({ someProperty: 100 });
```

One thing to be aware of is that it will be treated like any data change in the model, so when you 
hot swap the current model it will re-validate and check for changes automatically.