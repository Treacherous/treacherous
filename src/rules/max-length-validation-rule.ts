import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public validate(modelHelper:ModelHelper, propertyName:string, maxLength: number): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length <= maxLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, maxLength) {
        var value = modelHelper.resolve(propertyName);
        return `This field has a length of ${value.length} but should contain no more than ${maxLength}`;
    }
}