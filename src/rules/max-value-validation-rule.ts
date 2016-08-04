import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MaxValueValidationRule implements IValidationRule
{
    public ruleName = "maxValue";

    public validate(modelResolver: IModelResolver, propertyName: string, maxValue:any): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value <= maxValue)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, maxValue: any) {
        var value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}