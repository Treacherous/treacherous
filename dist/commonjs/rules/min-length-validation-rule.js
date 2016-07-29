"use strict";
var MinLengthValidationRule = (function () {
    function MinLengthValidationRule() {
        this.ruleName = "minLength";
    }
    MinLengthValidationRule.prototype.validate = function (modelHelper, propertyName, minLength) {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        if (value.length >= minLength) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    MinLengthValidationRule.prototype.getMessage = function (modelHelper, propertyName, minLength) {
        var value = modelHelper.resolve(propertyName);
        return "This field has a length of " + value.length + " but should more than " + minLength;
    };
    return MinLengthValidationRule;
}());
exports.MinLengthValidationRule = MinLengthValidationRule;
