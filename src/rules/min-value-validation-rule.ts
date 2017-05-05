import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MinValueValidationRule implements IValidationRule
{
    public ruleName = "minValue";

    public async validate(modelResolver: IModelResolver, propertyName: string, minValue): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value >= minValue;
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, minValue: any) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} but should be greater than or equal to ${minValue}`;
    }
}