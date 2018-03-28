import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public async validate(modelResolver: IModelResolver, propertyName: string, maxLength: number): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return value.length <= maxLength;
    }
}