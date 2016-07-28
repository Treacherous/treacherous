import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public validate(modelResolver: IModelResolver, propertyName: string, minLength:any): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length >= minLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, minLength) {
        var value = modelResolver.resolve(propertyName);
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}