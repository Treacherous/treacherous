System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DecimalValidationRule;
    return {
        setters:[],
        execute: function() {
            DecimalValidationRule = (function () {
                function DecimalValidationRule() {
                    this.ruleName = "decimal";
                    this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                }
                DecimalValidationRule.prototype.validate = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return Promise.resolve(true);
                    }
                    var matchesRegex = this.decimalRegex.test(value);
                    return Promise.resolve(matchesRegex);
                };
                DecimalValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field contains " + value + " which is not a decimal value";
                };
                return DecimalValidationRule;
            }());
            exports_1("DecimalValidationRule", DecimalValidationRule);
        }
    }
});
