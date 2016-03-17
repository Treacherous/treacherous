import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class RegexValidationRule implements IValidationRule
{
    public ruleName = "regex";

    public validate(value, regexPattern: RegExp): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        var matchesPattern = value.toString().match(regexPattern) !== null;
        return Promise.resolve(matchesPattern);
    }

    public getMessage(value, regexPattern) {
        return `This field does not match the expected format`;
    }
}