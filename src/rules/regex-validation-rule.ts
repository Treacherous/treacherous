import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class RegexValidationRule implements IValidationRule
{
    public ruleName = "regex";

    public async validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value.toString().match(regexPattern) !== null;
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp) {
        return `This field does not match the expected format`;
    }
}