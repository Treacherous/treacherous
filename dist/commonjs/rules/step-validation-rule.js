"use strict";
var StepValidationRule = (function () {
    function StepValidationRule() {
        this.ruleName = "step";
    }
    StepValidationRule.prototype.validate = function (value, step) {
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var dif = (value * 100) % (step * 100);
        var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        return Promise.resolve(matchesStep);
    };
    StepValidationRule.prototype.getMessage = function (value, step) {
        return "This field has a value of " + value + " and should be an increment of " + step;
    };
    return StepValidationRule;
}());
exports.StepValidationRule = StepValidationRule;
