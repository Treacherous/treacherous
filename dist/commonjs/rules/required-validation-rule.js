"use strict";
var RequiredValidationRule = (function () {
    function RequiredValidationRule() {
        this.ruleName = "required";
    }
    RequiredValidationRule.prototype.validate = function (mr, prop, isRequired) {
        if (isRequired === void 0) { isRequired = true; }
        var value = mr.get(prop);
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
    RequiredValidationRule.prototype.getMessage = function (mr, prop, isRequired) {
        var value = mr.get(prop);
        return "This field is required";
    };
    return RequiredValidationRule;
}());
exports.RequiredValidationRule = RequiredValidationRule;
