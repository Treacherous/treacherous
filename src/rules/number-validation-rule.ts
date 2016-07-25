import {IValidationRule} from "./ivalidation-rule";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public validate(mr, prop): Promise<boolean>
    {
        var value = mr.get(prop);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(mr, prop) {
        var value = mr.get(prop);
        return `This field contains ${value} which is not a numeric value`;
    }
}