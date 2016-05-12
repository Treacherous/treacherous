# Creating Rulesets

Creating rulesets is really simple, and they are created without needing a model so you can make your rules without 
having a class or object. The rulesets are glorified dictionaries which tie a property to a set of rules and 
are very lightweight objects with no logic.

---

## Available Methods

When creating a ruleset there are the following methods:

### forProperty(propertyName: string)

This takes a string which should be the property name that you wish to apply rules to.

### addRule(ruleType: string, ruleArgs?: any)

This adds a rule to a previously specified property, it is mandatory for you to provide a rule type however
not all rule types require arguments. For example if you were to use `.addRule("required")` that would be 
perfectly fine, however if you were to want to specify a max length you would need to provide it the 
length you wish, so that would look like `.addRule("maxLength", 5);`. Each rule is different and you can 
accept custom objects if you have complex rules, although its recommended you keep them as simple as possible.

### addRuleset(ruleset: Ruleset)

This much like `addRule` specifies that the ruleset provided should be used within the current property. This 
is the primary way of composing rulesets for complex objects.

### addRuleForEach(ruleType: string, ruleArgs?: any)

This is for use with arrays and basically specifies a repeatable rule for every element within the array, so 
for example if we were to have `.addRuleForEach("maxValue", 10);` we would be saying that all elements in the array 
must be <= 10, although this is only really used when you have all value type elements and not complex objects in
the arrays.

### addRulesetForEach(ruleset: Ruleset)

This is for use with arrays and specifies that each element within the array should be subject to the ruleset
provided, so this allows for complex repeatable rules with very little effort.

### build()

This method builds the configured ruleset for use within the validation group object or other rulesets. Behind 
the scenes there is a `RulesetBuilder` which is being used to build up the concerns and this returns the ruleset 
rather than the chainable builder.

### create()

This method is rarely used as it is called for you via the `Treacherous.createRuleset()` method however if 
you were to use the `RulesetBuilder` directly without going via the mentioned method you would need to 
call `create` before building to make sure it resets all internal configuration state.

---

## Simplest Example

```js
var ruleset = Treacherous.createRuleset()
    .forProperty("foo")
        .addRule("maxLength", 5)        // The array can only contain <= 5 elements
    .build();
```

So the above example is basically setting up a ruleset where it expects a property called `foo` and that property
should have a `maxLength` of 5. You can easily add multiple rules or nested rules to properties allowing for a 
very flexible and composite approach to ruleset building and management.

## More Complex Example

```js
var ruleset = Treacherous.createRuleset()
    .forProperty("foo")
        .addRule("maxLength", 5)        // The array can only contain <= 5 elements
    .forProperty("bar")
        .addRule("required")        // The array can only contain <= 5 elements
    .build();
```

## Nested Example

```js
var childRuleset = rulesetBuilder.create()
    .forProperty("bar")
        .addRule("maxLength", 5)
    .build();

var ruleset = rulesetBuilder.create()
    .forProperty("foo")
        .addRuleset(childRuleset) // Reusing the other ruleset
    .build();
```

So as shown above we can easily nest rulesets by creating each layer in the validation as its own ruleset. 
The first ruleset is saying that there should be a property called `bar` which has a `maxlength` of 5, then 
there is the ruleset which expects a `foo` property which should adhere to the `childRuleset`.

Just to be more explicit the above `ruleset` variable would be looking for a model like so:

```js
{
    "bar": {
        "foo": "valid" // This must have a length <= 5
    }
}
```

It is recommended that you basically have a ruleset per object type, so if you had an `Item` class and 
an `Inventory` class it would make sense to re-use the `Item` rules within the context of the `Inventory`.

## Validating With Arrays

So building upon the previous example you can easily validate arrays, be they simple with singular values
or complex objects within them, by using the `*forEach` methods.


```js
var ruleset = rulesetBuilder.create()
    .forProperty("someSimpleArray")
        .addRuleForEach("maxLength", 5)
    .build();
```

This will tell it to loop through the `someSimpleArray` property and check that each element in the array
has a length <= 5.

You can also set rulesets to be repeated like shown:

```js
var childRuleset = rulesetBuilder.create()
    .forProperty("bar")
        .addRule("maxLength", 5)
    .build();

var ruleset = rulesetBuilder.create()
    .forProperty("someArray")
        .addRulesetForEach(childRuleset)
    .build();
```

This will make sure that every element in `someArray` has a property named `bar` that has a length <= 5.
