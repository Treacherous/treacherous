define(["require", "exports", "../helpers/type-helper", "../helpers/comparer-helper"], function (require, exports, type_helper_1, comparer_helper_1) {
    "use strict";
    var NotEqualValidationRule = (function () {
        function NotEqualValidationRule() {
            this.ruleName = "notEqual";
        }
        NotEqualValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var result;
            var comparison = optionsOrValue.value || optionsOrValue;
            var weakEquality = optionsOrValue.weakEquality || false;
            if (type_helper_1.TypeHelper.isFunctionType(comparison)) {
                comparison = comparison();
            }
            if (type_helper_1.TypeHelper.isDateType(comparison)) {
                result = !comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
            }
            else {
                result = !comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
            }
            return Promise.resolve(result);
        };
        NotEqualValidationRule.prototype.getMessage = function (modelResolver, propertyName, optionsOrValue) {
            var value = modelResolver.resolve(propertyName);
            return "This field is " + value + " but should not be equal to " + (optionsOrValue.value || optionsOrValue);
        };
        return NotEqualValidationRule;
    }());
    exports.NotEqualValidationRule = NotEqualValidationRule;
});
