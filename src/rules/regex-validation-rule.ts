import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class RegexValidationRule implements IValidationRule
{
    public ruleName = "regex";

    public validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        var matchesPattern = value.toString().match(regexPattern) !== null;
        return Promise.resolve(matchesPattern);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp) {
        return `This field does not match the expected format`;
    }
}