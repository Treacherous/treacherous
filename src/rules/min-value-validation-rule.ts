import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class MinValueValidationRule implements IValidationRule
{
    public ruleName = "minValue";

    public validate(modelHelper:ModelHelper, propertyName:string, minValue): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value >= minValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, minValue: any) {
        var value = modelHelper.resolve(propertyName);
        return `This field has a value of ${value} but should be greater than or equal to ${minValue}`;
    }
}