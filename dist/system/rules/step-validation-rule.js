System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StepValidationRule;
    return {
        setters:[],
        execute: function() {
            StepValidationRule = (function () {
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
            exports_1("StepValidationRule", StepValidationRule);
        }
    }
});