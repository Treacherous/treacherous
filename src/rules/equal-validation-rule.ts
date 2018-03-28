import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class EqualValidationRule implements IValidationRule
{
    public ruleName = "equal";

    public async validate(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);

        if (TypeHelper.isEmptyValue(value))
        { return true; }

        let comparison = optionsOrValue.value || optionsOrValue;
        const weakEquality = optionsOrValue.weakEquality || false;

        if(TypeHelper.isFunctionType(comparison))
        { comparison = comparison(); }

        if(TypeHelper.isDateType(comparison))
        { return ComparerHelper.dateTimeCompararer(value, comparison); }
        else
        { return ComparerHelper.simpleTypeComparer(value, comparison, weakEquality); }
    }
}