System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NumberValidationRule;
    return {
        setters:[],
        execute: function() {
            NumberValidationRule = (function () {
                function NumberValidationRule() {
                    this.ruleName = "number";
                    this.numberRegex = /^\d+$/;
                }
                NumberValidationRule.prototype.validate = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return Promise.resolve(true);
                    }
                    var matchesRegex = this.numberRegex.test(value);
                    return Promise.resolve(matchesRegex);
                };
                NumberValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field contains " + value + " which is not a numeric value";
                };
                return NumberValidationRule;
            }());
            exports_1("NumberValidationRule", NumberValidationRule);
        }
    }
});
