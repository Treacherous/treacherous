import * as tslib_1 from "tslib";
import { TypeHelper } from "../helpers/type-helper";
import { ComparerHelper } from "../helpers/comparer-helper";
export class MatchesValidationRule {
    constructor() {
        this.ruleName = "matches";
    }
    validate(modelResolver, propertyName, optionsOrProperty) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
            const weakEquality = optionsOrProperty.weakEquality || false;
            const value = modelResolver.resolve(propertyName);
            const matchingFieldValue = modelResolver.resolve(fieldToMatch);
            if (value === undefined || value === null) {
                return (matchingFieldValue === undefined || matchingFieldValue === null);
            }
            else if (TypeHelper.isDateType(value)) {
                return ComparerHelper.dateTimeCompararer(value, matchingFieldValue);
            }
            else {
                return ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality);
            }
        });
    }
}
