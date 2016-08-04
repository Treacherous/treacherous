import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public validate(modelResolver: IModelResolver, propertyName: string, maxLength: number): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length <= maxLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, maxLength) {
        var value = modelResolver.resolve(propertyName);
        return `This field has a length of ${value.length} but should contain no more than ${maxLength}`;
    }
}