import {IModelResolver} from "../resolvers/imodel-resolver";
import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";

export class DecimalValidationRule implements IValidationRule
{
    public ruleName = "decimal";
    private decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);
        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return this.decimalRegex.test(value);
    }
}