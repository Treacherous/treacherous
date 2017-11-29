import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public async validate(modelResolver: IModelResolver, propertyName: string, maxLength: number): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value.length <= maxLength;
    }
}