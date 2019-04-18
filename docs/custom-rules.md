# Custom Rules

By default Treacherous sets up a `ruleRegistry` instance with all native rules, however you can easily make 
your own rules and add them into the rule registry.

## Creating a Rule

There is an [IValidationRule](../src/rules/ivalidation-rule.ts) file which is the interface that all rules 
should adhere to. Don't worry if you are not using Typescript it's fine you just need to make sure you have the 
methods listed in there.

So for example lets make a custom rule for checking if the value is "hello".

### Typescript Example
```typescript
import * as Promise from "bluebird";
import {IValidationRule} from "treacherous";
import {IModelResolver} from "treacherous";

export class HelloValidationRule implements IValidationRule
{
    public ruleName = "hello";

    public validate(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any): Promise<boolean>
    { 
        var value = modelResolver.resolve(propertyName);
        return Promise.resolve(value == "hello"); 
    }
}
```

### Javascript Example
```js
function HelloValidationRule()
{
    this.ruleName = "hello";

    this.validate = (modelResolver, propertyName, optionsOrValue) =>
    {
        var value = modelResolver.resolve(propertyName);
        return Promise.resolve(value == "hello"); 
    }
}
```

This rule now can be used within the Treacherous system by registering it within the `ruleRegistry`.

### Creating a custom error message

Since `0.17.0` Treacherous has a localization handler which takes care of resolving messages for rules asynchronously.

You can see the [doc on localization](./localization.md) for more information on how to set this up, but the simple use case is to supplement the current locale with your custom validation rule. This can be done like so:

```ts
import {localeHandler, supplementLocale} from "treacherous"

const currentLocale = localeHandler.getCurrentLocale(); // Incase you dont know what you are using, which is en-us by default
supplementLocale(currentLocale, {
    "hello": (value: any) => `This field is ${value} but should be hello`
});
```

This will get the current locale being used (its defaulted to `en-us`) and register a message for the `hello` rule.

As mentioned if you view the [doc on localization](./localization.md) you can see more in depth options for custom messages, as well as registering messages in multiple languages or with other use cases where you would not be augmenting languages locally like with i18n systems with its own back end.

---

### Extra Info

To provide some more information on each property:

* `ruleName`    - The name of the rule to be used within the `addRule` statements
* `validate`    - The validation method where you should verify the value and return a promise with true/false

(It is also worth mentioning that at some point the message will be pulled out when internationalisation occurs)

---

## Composite Rules / Virtual Properties

Treacherous 0.16 introduced the notion of composite rules where you can create rules that run against the model rather than a specific property. This is super useful if you want to do complex validation logic against multiple fields at once. 

A common example would be if you have a model like so:

```typescript
enum ContactPreference {
    None = 1,
    Phone,
    Email    
}

export class User
{
    public name: string;
    public email: string;
    public phone: string;

    public primaryCommunicationMethod: number;
}
```

Then if your primary communication method is `ContactPreference.Email` you need the email to be entered. There is a small amount of overlap with the `appliesIf` feature, but this is more for where you want to validate multiple properties at once, and/or dynamic properties which only exist at runtime.

### Creating Composite Rules

To create composite rules you need to implement this interface:

```typescript
export interface ICompositeValidationRule
{
    virtualPropertyName: string;
    validate(modelResolver: IModelResolver): Promise<boolean>;
}
```

The `virtualPropertyName` is the property name you would provide on any calls to check validity of a property, it can be any value but should be unique.

The `validate` provides you a way to resolve properties on the model using the `modelResolver` and should return a promise containin a true or false depending on if it is valid or not.

As with normal rules, you will need to register the error message with the localization handler, as this is not a regular rule with a name the `virtualPropertyName` should be used as the key for the message, you can have this as a raw string or a method which is passed the `modelResolver` for you to generate your message i.e:

```ts
import {localeHandler, supplementLocale} from "treacherous"

const currentLocale = localeHandler.getCurrentLocale(); // Incase you dont know what you are using, which is en-us by default
supplementLocale(currentLocale, {
    "myVirtualPropertyName": "The model has some invalid details related to ...",
    "someFancyVirtualPropertyName": (modelResolver: any, compositeRule: any) => { /*...*/ }
});
```

As you can see you can use a simple string, or take in the model resolver and the composite rule being used (incase you need any configuration data on the composite rule).

### Using Composite Rules

Once you have made your composite rule you can just apply it to your ruleset directly like so:

```js
let ruleset = createRuleset()
    .addCompositeRule(new MyCompositeRule())
    .build();
```

This allows you to register any composite rules at model level and have them act and report like real properties. So for example if you named your `virtualPropertyName` something like `primaryCommunication` *(based off previous example)* you would be able to query the `validationGroup` for that property as if it were a real property on the model and get its validity and errors associated. This also means that if you are using any of the treacherous view wrappers *(i.e knockout, aurelia, vue)* you can just reference this property name and it would display the errors in the view or view summaries etc.

---

## Registering a Rule

Once you have created a rule you then need to register it so the other components in the system are aware 
of it. This is pretty easy to do, so assuming we have created the above rule we can do the following:

```js
Treacherous.ruleRegistry.registerRule(new HelloValidationRule());
```

This now means everything else in the system will be aware of the "hello" rule, so if you were to do the 
following ruleset and use it in a validation group it would work.

```js
let ruleset = Treacherous.createRuleset()
    .forProperty("shouldBeHello")
        .addRule("hello") // Notice how we use the ruleName here
    .build();
```

That is all that you need to do and your rules just work.