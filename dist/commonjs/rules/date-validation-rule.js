"use strict";
var DateValidationRule = (function () {
    function DateValidationRule() {
        this.ruleName = "date";
        this.invalidObjectRegex = /Invalid|NaN/;
    }
    DateValidationRule.prototype.validate = function (value) {
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var matchesRegex = !this.invalidObjectRegex.test(new Date(value));
        return Promise.resolve(matchesRegex);
    };
    DateValidationRule.prototype.getMessage = function (value) {
        return "This field contains \"" + value + "\" which is not a valid date";
    };
    return DateValidationRule;
}());
exports.DateValidationRule = DateValidationRule;
