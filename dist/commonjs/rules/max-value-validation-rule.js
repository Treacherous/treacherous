"use strict";
var MaxValueValidationRule = (function () {
    function MaxValueValidationRule() {
        this.ruleName = "maxValue";
    }
    MaxValueValidationRule.prototype.validate = function (modelHelper, propertyName, maxValue) {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        if (value <= maxValue) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    MaxValueValidationRule.prototype.getMessage = function (modelHelper, propertyName, maxValue) {
        var value = modelHelper.resolve(propertyName);
        return "This field has a value of " + value + " but should be less than or equal to " + maxValue;
    };
    return MaxValueValidationRule;
}());
exports.MaxValueValidationRule = MaxValueValidationRule;
