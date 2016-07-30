import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public validate(modelHelper:ModelHelper, propertyName:string): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string) {
        var value = modelHelper.resolve(propertyName);
        return `This field contains ${value} which is not a numeric value`;
    }
}