import {ModelHelper} from "../model-helper";
;
import {IValidationRule} from "./ivalidation-rule";

export class DecimalValidationRule implements IValidationRule
{
    public ruleName = "decimal";
    private decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

    public validate(modelHelper:ModelHelper, propertyName:string): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.decimalRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string) {
        var value = modelHelper.resolve(propertyName);
        return `This field contains ${value} which is not a decimal value`;
    }
}