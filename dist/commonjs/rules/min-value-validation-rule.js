var MinValueValidationRule = (function () {
    function MinValueValidationRule() {
        this.ruleName = "minValue";
    }
    MinValueValidationRule.prototype.validate = function (value, minValue) {
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        if (value >= minValue) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    MinValueValidationRule.prototype.getMessage = function (value, minValue) {
        return "This field has a value of " + value + " but should be greater than or equal to " + minValue;
    };
    return MinValueValidationRule;
})();
exports.MinValueValidationRule = MinValueValidationRule;
