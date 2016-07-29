import {IValidationRule} from "./ivalidation-rule";
import {TypeHelper} from "../helpers/type-helper";
import {ComparerHelper} from "../helpers/comparer-helper";
import {ModelHelper} from "../model-helper";

export class NotEqualValidationRule implements IValidationRule
{
    public ruleName = "notEqual";

    public validate(modelHelper:ModelHelper, propertyName:string, optionsOrValue): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);

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

    public getMessage(modelHelper:ModelHelper, propertyName:string, optionsOrValue) {
        var value = modelHelper.resolve(propertyName);
        return `This field is ${value} but should not be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}