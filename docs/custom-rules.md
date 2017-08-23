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

    public getMessage(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any) 
    { 
        var value = modelResolver.resolve(propertyName);
        return `This field is ${value} but should be hello`; 
    }
}
```

### Javascript Example
```js
function HelloValidationRule()
{
    this.ruleName = "hello";

    this.validate(modelResolver, propertyName, optionsOrValue)
    {
        var value = modelResolver.resolve(propertyName);
        return Promise.resolve(value == "hello"); 
    }

    this.getMessage(value, optionsOrValue) 
    { 
        var value = modelResolver.resolve(propertyName);
        return "This field is " + value + "but should be hello"; 
    }
}
```

This rule now can be used within the Treacherous system by registering it within the `ruleRegistry`.

### Extra Info

To provide some more information on each property:

* `ruleName`    - The name of the rule to be used within the `addRule` statements
* `validate`    - The validation method where you should verify the value and return a promise with true/false
* `getMessage`  - The getMessage method should return a string providing information related to the validation error

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
    getMessage(modelResolver: IModelResolver): string;
}
```

The `virtualPropertyName` is the property name you would provide on any calls to check validity of a property, it can be any value but should be unique per model.

The `validate` provides you a way to resolve properties on the model using the `modelResolver` and should return a promise containin a true or false depending on if it is valid or not.

The `getMessage` should output an error message which explains what is wrong and why it failed validation.

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