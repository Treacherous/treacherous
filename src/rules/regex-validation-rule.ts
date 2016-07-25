import {IValidationRule} from "./ivalidation-rule";

export class RegexValidationRule implements IValidationRule
{
    public ruleName = "regex";

    public validate(mr, prop, regexPattern: RegExp): Promise<boolean>
    {
        var value = mr.get(prop);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        var matchesPattern = value.toString().match(regexPattern) !== null;
        return Promise.resolve(matchesPattern);
    }

    public getMessage(mr, prop, regexPattern) {
        return `This field does not match the expected format`;
    }
}