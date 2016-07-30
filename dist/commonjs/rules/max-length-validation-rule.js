"use strict";
var MaxLengthValidationRule = (function () {
    function MaxLengthValidationRule() {
        this.ruleName = "maxLength";
    }
    MaxLengthValidationRule.prototype.validate = function (modelHelper, propertyName, maxLength) {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        if (value.length <= maxLength) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    MaxLengthValidationRule.prototype.getMessage = function (modelHelper, propertyName, maxLength) {
        var value = modelHelper.resolve(propertyName);
        return "This field has a length of " + value.length + " but should contain no more than " + maxLength;
    };
    return MaxLengthValidationRule;
}());
exports.MaxLengthValidationRule = MaxLengthValidationRule;
