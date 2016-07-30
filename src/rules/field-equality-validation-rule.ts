import {ModelHelper} from "../model-helper";
;
import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";
import {property} from "../helpers/property";

export class FieldEqualityValidationRule implements IValidationRule
{
    public ruleName = "fieldEquality";

    public validate(modelHelper:ModelHelper, propertyName:string, optionsOrValue): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var result;
        var comparison = modelHelper.resolve(optionsOrValue.value || optionsOrValue);
        var weakEquality = optionsOrValue.weakEquality || false;

        if(TypeHelper.isDateType(comparison))
        { result = ComparerHelper.dateTimeCompararer(value, comparison); }
        else
        { result = ComparerHelper.simpleTypeComparer(value, comparison, weakEquality); }

        return Promise.resolve(result);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, optionsOrValue) {
        var field1 = modelHelper.resolve(propertyName);
        var field2 = modelHelper.resolve(optionsOrValue.value || optionsOrValue);
        return `Field ${propertyName} should be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}