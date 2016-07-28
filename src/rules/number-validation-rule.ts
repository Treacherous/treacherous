import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        var value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a numeric value`;
    }
}