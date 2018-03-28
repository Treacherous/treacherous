import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class MinValueValidationRule implements IValidationRule
{
    public ruleName = "minValue";

    public async validate(modelResolver: IModelResolver, propertyName: string, minValue: any): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return value >= minValue;
    }
}