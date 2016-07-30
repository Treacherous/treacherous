import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class DateValidationRule implements IValidationRule
{
    public ruleName = "date";
    private invalidObjectRegex = /Invalid|NaN/;

    public validate(modelHelper:ModelHelper, propertyName:string): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = !this.invalidObjectRegex.test(<any>new Date(value));
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string) {
        var value = modelHelper.resolve(propertyName);
        return `This field contains "${value}" which is not a valid date`;
    }
}