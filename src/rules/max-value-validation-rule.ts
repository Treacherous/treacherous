import {IValidationRule} from "./ivalidation-rule";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public validate(mr, prop, maxValue:any): Promise<boolean>
    {
        var value = mr.get(prop);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value <= maxValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(mr, prop, maxValue: any) {
        var value = mr.get(prop);
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}