import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public async validate(modelResolver: IModelResolver, propertyName: string, minLength:any): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value.length >= minLength;
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, minLength) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}