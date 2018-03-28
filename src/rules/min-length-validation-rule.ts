import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public async validate(modelResolver: IModelResolver, propertyName: string, minLength:number): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return value.length >= minLength;
    }
}