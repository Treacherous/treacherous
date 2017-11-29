import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public async validate(modelResolver: IModelResolver, propertyName: string, maxValue: any): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value <= maxValue;
    }
}