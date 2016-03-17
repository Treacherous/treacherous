import {IValidationRule} from "./ivalidation-rule";

export class RuleRegistry
{
    public rules = {};

    public registerRule = (validationRule: IValidationRule): void =>
    {
        this.rules[validationRule.ruleName] = validationRule;
    }

    public unregisterRule = (validationRule: IValidationRule): void =>
    {
        delete this.rules[validationRule.ruleName];
    }

    public getRuleNamed = (ruleName: string): IValidationRule =>
    {
        return this.rules[ruleName];
    }
}