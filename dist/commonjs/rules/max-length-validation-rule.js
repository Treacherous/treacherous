var MaxLengthValidationRule = (function () {
    function MaxLengthValidationRule() {
        this.ruleName = "maxLength";
    }
    MaxLengthValidationRule.prototype.validate = function (value, maxLength) {
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        if (value.length <= maxLength) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    MaxLengthValidationRule.prototype.getMessage = function (value, maxLength) {
        return "This field has a length of " + value.length + " but should contain no more than " + maxLength;
    };
    return MaxLengthValidationRule;
})();
exports.MaxLengthValidationRule = MaxLengthValidationRule;
