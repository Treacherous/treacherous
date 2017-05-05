import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return true; }

        return this.numberRegex.test(value);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a numeric value`;
    }
}