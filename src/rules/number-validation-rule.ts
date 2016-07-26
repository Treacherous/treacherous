import {IValidationRule} from "./ivalidation-rule";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public validate(model, value): Promise<boolean>
    {
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(model, value) {
        return `This field contains ${value} which is not a numeric value`;
    }
}