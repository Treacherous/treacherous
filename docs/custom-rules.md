# Custom Rules

By default Treacherous sets up a `ruleRegistry` instance with all native rules, however you can easily make 
your own rules and add them into the rule registry.

## Creating a Rule

There is an [IValidationRule](../src/rules/ivalidation-rule.ts) file which is the interface that all rules 
should adhere to. Don't worry if you are not using Typescript it's fine you just need to make sure you have the 
methods listed in there.

So for example lets make a custom rule for checking if the value is "hello".

### Typescript Example
```
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

## Registering a Rule

Once you have created a rule you then need to register it so the other components in the system are aware 
of it. This is pretty easy to do, so assuming we have created the above rule we can do the following:

```js
Treacherous.ruleRegistry.registerRule(new HelloValidationRule());
```

This now means everything else in the system will be aware of the "hello" rule, so if you were to do the 
following ruleset and use it in a validation group it would work.

```js
var ruleset = Treacherous.createRuleset()
    .forProperty("shouldBeHello")
        .addRule("hello") // Notice how we use the ruleName here
    .build();
```

That is all that you need to do and your rules just work.