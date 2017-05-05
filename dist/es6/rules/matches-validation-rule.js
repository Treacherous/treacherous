import { TypeHelper } from "../helpers/type-helper";
import { ComparerHelper } from "../helpers/comparer-helper";
export class MatchesValidationRule {
    constructor() {
        this.ruleName = "matches";
    }
    async validate(modelResolver, propertyName, optionsOrProperty) {
        let fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        let weakEquality = optionsOrProperty.weakEquality || false;
        let value = modelResolver.resolve(propertyName);
        let matchingFieldValue = modelResolver.resolve(fieldToMatch);
        if (value === undefined || value === null) {
            return (matchingFieldValue === undefined || matchingFieldValue === null);
        }
        else if (TypeHelper.isDateType(value)) {
            return ComparerHelper.dateTimeCompararer(value, matchingFieldValue);
        }
        else {
            return ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality);
        }
    }
    getMessage(modelResolver, propertyName, optionsOrProperty) {
        let value = modelResolver.resolve(propertyName);
        let fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        let matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    }
}
