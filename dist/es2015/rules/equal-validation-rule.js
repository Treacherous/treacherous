import * as tslib_1 from "tslib";
import { TypeHelper } from "../helpers/type-helper";
import { ComparerHelper } from "../helpers/comparer-helper";
export class EqualValidationRule {
    constructor() {
        this.ruleName = "equal";
    }
    validate(modelResolver, propertyName, optionsOrValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return true;
            }
            let comparison = optionsOrValue.value || optionsOrValue;
            const weakEquality = optionsOrValue.weakEquality || false;
            if (TypeHelper.isFunctionType(comparison)) {
                comparison = comparison();
            }
            if (TypeHelper.isDateType(comparison)) {
                return ComparerHelper.dateTimeCompararer(value, comparison);
            }
            else {
                return ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
            }
        });
    }
}
