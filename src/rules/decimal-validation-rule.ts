import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class DecimalValidationRule implements IValidationRule
{
    public ruleName = "decimal";
    private decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

    public validate(value): Promise<boolean>
    {
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.decimalRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(value) {
        return `This field contains ${value} which is not a decimal value`;
    }
}