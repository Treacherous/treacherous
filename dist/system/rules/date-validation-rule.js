System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DateValidationRule;
    return {
        setters:[],
        execute: function() {
            DateValidationRule = (function () {
                function DateValidationRule() {
                    this.ruleName = "date";
                    this.invalidObjectRegex = /Invalid|NaN/;
                }
                DateValidationRule.prototype.validate = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return Promise.resolve(true);
                    }
                    var matchesRegex = !this.invalidObjectRegex.test(new Date(value));
                    return Promise.resolve(matchesRegex);
                };
                DateValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field contains \"" + value + "\" which is not a valid date";
                };
                return DateValidationRule;
            }());
            exports_1("DateValidationRule", DateValidationRule);
        }
    }
});
