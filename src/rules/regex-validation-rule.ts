import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class RegexValidationRule implements IValidationRule
{
    public ruleName = "regex";

    public validate(modelHelper:ModelHelper, propertyName:string, regexPattern: RegExp): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        var matchesPattern = value.toString().match(regexPattern) !== null;
        return Promise.resolve(matchesPattern);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, regexPattern) {
        return `This field does not match the expected format`;
    }
}