define(["require", "exports", "../helpers/type-helper", "../helpers/comparer-helper"], function (require, exports, type_helper_1, comparer_helper_1) {
    "use strict";
    var MatchesValidationRule = (function () {
        function MatchesValidationRule() {
            this.ruleName = "matches";
        }
        MatchesValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrProperty) {
            var fieldToMatch = optionsOrProperty.property || optionsOrProperty;
            var weakEquality = optionsOrProperty.weakEquality || false;
            var value = modelResolver.resolve(propertyName);
            var matchingFieldValue = modelResolver.resolve(fieldToMatch);
            var result;
            if (value === undefined || value === null) {
                result = (matchingFieldValue === undefined || matchingFieldValue === null);
            }
            else if (type_helper_1.TypeHelper.isDateType(value)) {
                result = comparer_helper_1.ComparerHelper.dateTimeCompararer(value, matchingFieldValue);
            }
            else {
                result = comparer_helper_1.ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality);
            }
            return Promise.resolve(result);
        };
        MatchesValidationRule.prototype.getMessage = function (modelResolver, propertyName, optionsOrProperty) {
            var value = modelResolver.resolve(propertyName);
            var fieldToMatch = optionsOrProperty.property || optionsOrProperty;
            var matchingFieldValue = modelResolver.resolve(fieldToMatch);
            return "This field is " + value + " but should match " + matchingFieldValue;
        };
        return MatchesValidationRule;
    }());
    exports.MatchesValidationRule = MatchesValidationRule;
});
