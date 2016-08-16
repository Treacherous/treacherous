System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MaxValueValidationRule;
    return {
        setters:[],
        execute: function() {
            MaxValueValidationRule = (function () {
                function MaxValueValidationRule() {
                    this.ruleName = "maxValue";
                }
                MaxValueValidationRule.prototype.validate = function (modelResolver, propertyName, maxValue) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null || value.length == 0) {
                        return Promise.resolve(true);
                    }
                    if (value <= maxValue) {
                        return Promise.resolve(true);
                    }
                    return Promise.resolve(false);
                };
                MaxValueValidationRule.prototype.getMessage = function (modelResolver, propertyName, maxValue) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field has a value of " + value + " but should be less than or equal to " + maxValue;
                };
                return MaxValueValidationRule;
            }());
            exports_1("MaxValueValidationRule", MaxValueValidationRule);
        }
    }
});
