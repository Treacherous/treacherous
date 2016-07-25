import {ModelResolver} from "../model-resolver";
;
import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";
import {property} from "../helpers/property";

export class FieldEqualityValidationRule implements IValidationRule
{
    public ruleName = "fieldEquality";

    public validate(mr, prop, optionsOrValue): Promise<boolean>
    {
        var value = mr.get(prop);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var result;
        var comparison = mr.get(optionsOrValue.value || optionsOrValue);
        var weakEquality = optionsOrValue.weakEquality || false;

        if(TypeHelper.isDateType(comparison))
        { result = ComparerHelper.dateTimeCompararer(value, comparison); }
        else
        { result = ComparerHelper.simpleTypeComparer(value, comparison, weakEquality); }

        return Promise.resolve(result);
    }

    public getMessage(mr, prop, optionsOrValue) {
        var field1 = mr.get(prop);
        var field2 = mr.get(optionsOrValue.value || optionsOrValue);
        return `Field ${prop} should be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}