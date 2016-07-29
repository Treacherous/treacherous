import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public validate(modelHelper:ModelHelper, propertyName:string, minLength:any): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length >= minLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, minLength) {
        var value = modelHelper.resolve(propertyName);
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}