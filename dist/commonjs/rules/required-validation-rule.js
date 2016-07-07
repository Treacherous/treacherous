var RequiredValidationRule = (function () {
    function RequiredValidationRule() {
        this.ruleName = "required";
    }
    RequiredValidationRule.prototype.validate = function (value, isRequired) {
        if (isRequired === void 0) { isRequired = true; }
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
    RequiredValidationRule.prototype.getMessage = function (value, isRequired) {
        return "This field is required";
    };
    return RequiredValidationRule;
})();
exports.RequiredValidationRule = RequiredValidationRule;
