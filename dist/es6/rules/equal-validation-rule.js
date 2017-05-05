import { TypeHelper } from "../helpers/type-helper";
import { ComparerHelper } from "../helpers/comparer-helper";
export class EqualValidationRule {
    constructor() {
        this.ruleName = "equal";
    }
    async validate(modelResolver, propertyName, optionsOrValue) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return true;
        }
        let comparison = optionsOrValue.value || optionsOrValue;
        let weakEquality = optionsOrValue.weakEquality || false;
        if (TypeHelper.isFunctionType(comparison)) {
            comparison = comparison();
        }
        if (TypeHelper.isDateType(comparison)) {
            return ComparerHelper.dateTimeCompararer(value, comparison);
        }
        else {
            return ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
        }
    }
    getMessage(modelResolver, propertyName, optionsOrValue) {
        var value = modelResolver.resolve(propertyName);
        return `This field is ${value} but should be equal to ${optionsOrValue.value || optionsOrValue}`;
    }
}
