import {IValidationRule} from "./ivalidation-rule";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public validate(mr, prop, maxLength: number): Promise<boolean>
    {
        var value = mr.get(prop);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length <= maxLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(mr, prop, maxLength) {
        var value = mr.get(prop);
        return `This field has a length of ${value.length} but should contain no more than ${maxLength}`;
    }
}