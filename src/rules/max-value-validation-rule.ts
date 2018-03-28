import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public async validate(modelResolver: IModelResolver, propertyName: string, maxValue: any): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);
        
        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return value <= maxValue;
    }
}