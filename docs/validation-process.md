# Validation Process

The validation process in Treacherous is split up between registered rules, ruleset creation and model validation,
this is mainly to allow for composite rule generation, however behind the scenes there are some other 
steps which you may or may not care about depending upon if you wish to customize how things work.

For most instances all you will care about is [creating rulesets](creating-rulesets.md) and [validating models](validation-groups.md),
which is all exposed via the high level `Treacherous` object, this contains methods for creating rulesets/validation groups. 
However if you want to know more or start tinkering with it more then there is a higher level process behind the scenes.

---

## High Level Process

- Create Rule Registry
- Register Rules
- Create Validation Group Factory
- Create Ruleset For Model
- Create Validation Group For Model + Ruleset

So the first 3 steps (and some more) are done for you by Treacherous and can be seen in [exposer.ts](../src/exposer.ts), however you 
can easily replace this with your own validation group factories or internal validation processors etc.

One of the key things to think about is the 3 core aspects of the validation system:

- Registered Rules
- Ruleset Creation
- Validation Group Creation

### Registered Rules

So as mentioned Treacherous by default creates a global `ruleRegistry` object and registers all the native rules
so you do not need to worry about handling that. In most cases you will just want to add to that when you have your 
own [custom rules](custom-rules.md).

### Ruleset Creation

Treacherous internally has a `RulesetBuilder` which it uses to give a fluent style approach to building rulesets, 
you do not have to use this though, as internally this just creates ruleset objects and applies rule links or rulesets
as applicable. For the most part though you will not even know you are using half of this stuff as it is all 
exposed via the 3 main methods on the `Treacherous` object, but its worth knowing these bits exist.

### Validation Group Creation

Again in most cases you will just call `createGroup` with the model and rulesets you care about, behind the scenes 
this is the validation group factory automatically satisfying a lot of the dependencies required for the `ValidationGroup` 
to function.

You can make your own implementation of `IValidationGroup` as long as it satisfies the interface and the tests pass
you can easily create your own ways of validating. In most cases though you do not really need to do this, as even with 
other frameworks like knockout which has custom `ko.observable` properties and not basic value types, the logic to resolve 
those properties live in a class which is outside of the validation group, so it is quite flexible and it may be worth looking 
at how the other plugins for treacherous work in this area if you want to support weird and wonderful scenarios.

---

## How The Validation Works

So inside the validation group there are a few components which do some important things:

- FieldErrorProcessor
- ModelWatcher
- PropertyResolver
- RuleResolver

As mentioned previously this is the *DEFAULT* ValidationGroup implementation, you are free to make your own, 
however in most cases you can just swap out the dependent components and solve your problems.

### FieldErrorProcessor

This basically takes a value and some rules and executes them all returning the promise containing the result.
For all intents and purposes this is the core validator as it will go through all rules it is given until it
fails and then stops processing.

### ModelWatcher

As the name implies this basically watches the model that is being validated and will notify whatever is listening
to tell it that a property has changed, this is mainly what drives the reactive element of it all.

### PropertyResolver

This is in charge of resolving a property value from a property path, so this will get all the values from 
the model based upon the path to the property. This does incur some minor performance issues when lots of 
validation is happening at once on large models, but generally it is deemed fast enough.

### RuleResolver

This is same sort of thing as the PropertyResolver, it gets all rules applicable to a propertyPath. This is
used to get the rules for each property which delegates through to the other components.