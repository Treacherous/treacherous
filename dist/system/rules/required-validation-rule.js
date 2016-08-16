System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RequiredValidationRule;
    return {
        setters:[],
        execute: function() {
            RequiredValidationRule = (function () {
                function RequiredValidationRule() {
                    this.ruleName = "required";
                }
                RequiredValidationRule.prototype.validate = function (modelResolver, propertyName, isRequired) {
                    if (isRequired === void 0) { isRequired = true; }
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return Promise.resolve(!isRequired);
                    }
                    var testValue = value;
                    if (typeof (testValue) === 'string') {
                        if (String.prototype.trim) {
                            testValue = value.trim();
                        }
                        else {
                            testValue = value.replace(/^\s+|\s+$/g, '');
                        }
                    }
                    if (!isRequired) {
                        return Promise.resolve(true);
                    }
                    return Promise.resolve((testValue + '').length > 0);
                };
                RequiredValidationRule.prototype.getMessage = function (modelResolver, propertyName, isRequired) {
                    return "This field is required";
                };
                return RequiredValidationRule;
            }());
            exports_1("RequiredValidationRule", RequiredValidationRule);
        }
    }
});
