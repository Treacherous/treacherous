var type_helper_1 = require("../helpers/type-helper");
var comparer_helper_1 = require("../helpers/comparer-helper");
var NotEqualValidationRule = (function () {
    function NotEqualValidationRule() {
        this.ruleName = "notEqual";
    }
    NotEqualValidationRule.prototype.validate = function (value, optionsOrValue) {
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var result;
        var comparison = optionsOrValue.value || optionsOrValue;
        var weakEquality = optionsOrValue.weakEquality || false;
        if (type_helper_1.TypeHelper.isDateType(comparison)) {
            result = !comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
        }
        else {
            result = !comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
        }
        return Promise.resolve(result);
    };
    NotEqualValidationRule.prototype.getMessage = function (value, optionsOrValue) {
        return "This field is " + value + " but should not be equal to " + (optionsOrValue.value || optionsOrValue);
    };
    return NotEqualValidationRule;
})();
exports.NotEqualValidationRule = NotEqualValidationRule;
