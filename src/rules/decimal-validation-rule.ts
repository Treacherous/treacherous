import {IModelResolver} from "../resolvers/imodel-resolver";
import {IValidationRule} from "./ivalidation-rule";

export class DecimalValidationRule implements IValidationRule
{
    public ruleName = "decimal";
    private decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

    public validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var matchesRegex = this.decimalRegex.test(value);
        return Promise.resolve(matchesRegex);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        var value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a decimal value`;
    }
}