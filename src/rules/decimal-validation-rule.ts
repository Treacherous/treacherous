import {IModelResolver} from "../resolvers/imodel-resolver";
import {IValidationRule} from "./ivalidation-rule";

export class DecimalValidationRule implements IValidationRule
{
    public ruleName = "decimal";
    private decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return true; }

        return this.decimalRegex.test(value);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a decimal value`;
    }
}