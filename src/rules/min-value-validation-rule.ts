import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MinValueValidationRule implements IValidationRule
{
    public ruleName = "minValue";

    public validate(modelResolver: IModelResolver, propertyName: string, minValue): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value >= minValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, minValue: any) {
        var value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} but should be greater than or equal to ${minValue}`;
    }
}