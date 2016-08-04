import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class EqualValidationRule implements IValidationRule
{
    public ruleName = "equal";

    public validate(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var result;
        var comparison = optionsOrValue.value || optionsOrValue;
        var weakEquality = optionsOrValue.weakEquality || false;

        if(TypeHelper.isDateType(comparison))
        { result = ComparerHelper.dateTimeCompararer(value, comparison); }
        else
        { result = ComparerHelper.simpleTypeComparer(value, comparison, weakEquality); }

        return Promise.resolve(result);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any) {
        var value = modelResolver.resolve(propertyName);
        return `This field is ${value} but should be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}