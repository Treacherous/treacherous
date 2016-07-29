import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public validate(modelHelper:ModelHelper, propertyName:string, maxValue:any): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value <= maxValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, maxValue: any) {
        var value = modelHelper.resolve(propertyName);
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}