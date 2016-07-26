import {IValidationRule} from "./ivalidation-rule";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public validate(model, value: any, maxValue: any): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value <= maxValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(model, value: any, maxValue: any) {
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}