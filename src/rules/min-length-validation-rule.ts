import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class MinLengthValidationRule implements IValidationRule
{
    public ruleName = "minLength";

    public async validate(modelResolver: IModelResolver, propertyName: string, minLength:number): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);

        if (value === undefined || value === null || value.length == 0)
        { return true; }

        return value.length >= minLength;
    }
}