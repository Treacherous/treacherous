import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";

export class NotEqualValidationRule implements IValidationRule
{
    public ruleName = "notEqual";

    public validate(mr, prop, optionsOrValue): Promise<boolean>
    {
        var value = mr.get(prop);

        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var result;
        var comparison = optionsOrValue.value || optionsOrValue;
        var weakEquality = optionsOrValue.weakEquality || false;

        if(TypeHelper.isDateType(comparison))
        { result = !ComparerHelper.dateTimeCompararer(value, comparison); }
        else
        { result = !ComparerHelper.simpleTypeComparer(value, comparison, weakEquality); }

        return Promise.resolve(result);
    }

    public getMessage(mr, prop, optionsOrValue) {
        var value = mr.get(prop);
        return `This field is ${value} but should not be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}