import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class NumberValidationRule implements IValidationRule
{
    public ruleName = "number";
    private numberRegex = /^\d+$/;

    public async validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);
        if (TypeHelper.isEmptyValue(value))
        { return true; }

        return this.numberRegex.test(value);
    }
}