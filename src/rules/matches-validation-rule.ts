import {PropertyResolver} from "property-resolver/index";
import {IValidationRule} from "./ivalidation-rule";

export class MatchesValidationRule implements IValidationRule
{
    public ruleName = "equal";

    constructor(private propertyResolver: PropertyResolver){}

    public validate(model, value, fieldToMatch: string): Promise<boolean>
    {
        if (fieldToMatch === undefined || fieldToMatch === null)
        { return Promise.resolve(false); }

        var matchingFieldValue = this.propertyResolver.resolveProperty(model, fieldToMatch);
        var result = matchingFieldValue === value;
        return Promise.resolve(result);
    }

    public getMessage(model, value, fieldToMatch: string) {
        var matchingFieldValue = this.propertyResolver.resolveProperty(model, fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    }
}