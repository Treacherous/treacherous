(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var StepValidationRule = (function () {
        function StepValidationRule() {
            this.ruleName = "step";
        }
        StepValidationRule.prototype.validate = function (modelResolver, propertyName, step) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var dif = (value * 100) % (step * 100);
            var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
            return Promise.resolve(matchesStep);
        };
        StepValidationRule.prototype.getMessage = function (modelResolver, propertyName, step) {
            var value = modelResolver.resolve(propertyName);
            return "This field has a value of " + value + " and should be an increment of " + step;
        };
        return StepValidationRule;
    }());
    exports.StepValidationRule = StepValidationRule;
});
