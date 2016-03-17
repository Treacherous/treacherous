import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public validate(value): Promise<boolean>
    {
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(value) {
        return `This field contains ${value} which is not a numeric value`;
    }
}