import {IValidationRule} from "./ivalidation-rule";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public validate(mr, prop, minLength:any): Promise<boolean>
    {
        var value = mr.get(prop);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length >= minLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(mr, prop, minLength) {
        var value = mr.get(prop);
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}