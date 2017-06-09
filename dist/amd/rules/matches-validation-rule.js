define(["require", "exports", "tslib", "../helpers/type-helper", "../helpers/comparer-helper"], function (require, exports, tslib_1, type_helper_1, comparer_helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MatchesValidationRule = (function () {
        function MatchesValidationRule() {
            this.ruleName = "matches";
        }
        MatchesValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrProperty) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var fieldToMatch, weakEquality, value, matchingFieldValue;
                return tslib_1.__generator(this, function (_a) {
                    fieldToMatch = optionsOrProperty.property || optionsOrProperty;
                    weakEquality = optionsOrProperty.weakEquality || false;
                    value = modelResolver.resolve(propertyName);
                    matchingFieldValue = modelResolver.resolve(fieldToMatch);
                    if (value === undefined || value === null) {
                        return [2 /*return*/, (matchingFieldValue === undefined || matchingFieldValue === null)];
                    }
                    else if (type_helper_1.TypeHelper.isDateType(value)) {
                        return [2 /*return*/, comparer_helper_1.ComparerHelper.dateTimeCompararer(value, matchingFieldValue)];
                    }
                    else {
                        return [2 /*return*/, comparer_helper_1.ComparerHelper.simpleTypeComparer(value, matchingFieldValue, weakEquality)];
                    }
                    return [2 /*return*/];
                });
            });
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
