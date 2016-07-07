var NumberValidationRule = (function () {
    function NumberValidationRule() {
        this.ruleName = "number";
        this.numberRegex = /^\d+$/;
    }
    NumberValidationRule.prototype.validate = function (value) {
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var matchesRegex = this.numberRegex.test(value);
        return Promise.resolve(matchesRegex);
    };
    NumberValidationRule.prototype.getMessage = function (value) {
        return "This field contains " + value + " which is not a numeric value";
    };
    return NumberValidationRule;
})();
exports.NumberValidationRule = NumberValidationRule;
