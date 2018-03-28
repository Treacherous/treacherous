import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return true; }

        if(value === "")
        { return true; }

        return this.numberRegex.test(value);
    }
}