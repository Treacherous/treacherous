System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MaxLengthValidationRule;
    return {
        setters:[],
        execute: function() {
            MaxLengthValidationRule = (function () {
                function MaxLengthValidationRule() {
                    this.ruleName = "maxLength";
                }
                MaxLengthValidationRule.prototype.validate = function (modelResolver, propertyName, maxLength) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null || value.length == 0) {
                        return Promise.resolve(true);
                    }
                    if (value.length <= maxLength) {
                        return Promise.resolve(true);
                    }
                    return Promise.resolve(false);
                };
                MaxLengthValidationRule.prototype.getMessage = function (modelResolver, propertyName, maxLength) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field has a length of " + value.length + " but should contain no more than " + maxLength;
                };
                return MaxLengthValidationRule;
            }());
            exports_1("MaxLengthValidationRule", MaxLengthValidationRule);
        }
    }
});