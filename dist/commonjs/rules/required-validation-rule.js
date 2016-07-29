"use strict";
var RequiredValidationRule = (function () {
    function RequiredValidationRule() {
        this.ruleName = "required";
    }
    RequiredValidationRule.prototype.validate = function (modelHelper, propertyName, isRequired) {
        if (isRequired === void 0) { isRequired = true; }
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null) {
            return Promise.resolve(!isRequired);
        }
        var testValue = value;
        if (typeof (testValue) === 'string') {
            if (String.prototype.trim) {
                testValue = value.trim();
            }
            else {
                testValue = value.replace(/^\s+|\s+$/g, '');
            }
        }
        if (!isRequired) {
            return Promise.resolve(true);
        }
        return Promise.resolve((testValue + '').length > 0);
    };
    RequiredValidationRule.prototype.getMessage = function (modelHelper, propertyName, isRequired) {
        var value = modelHelper.resolve(propertyName);
        return "This field is required";
    };
    return RequiredValidationRule;
}());
exports.RequiredValidationRule = RequiredValidationRule;
