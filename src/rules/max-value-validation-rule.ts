import {IValidationRule} from "./ivalidation-rule";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public validate(value, maxValue: number|Date): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value <= maxValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(value, maxValue) {
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}