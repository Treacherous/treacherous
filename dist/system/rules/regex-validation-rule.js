System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RegexValidationRule;
    return {
        setters:[],
        execute: function() {
            RegexValidationRule = (function () {
                function RegexValidationRule() {
                    this.ruleName = "regex";
                }
                RegexValidationRule.prototype.validate = function (modelResolver, propertyName, regexPattern) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null || value.length == 0) {
                        return Promise.resolve(true);
                    }
                    var matchesPattern = value.toString().match(regexPattern) !== null;
                    return Promise.resolve(matchesPattern);
                };
                RegexValidationRule.prototype.getMessage = function (modelResolver, propertyName, regexPattern) {
                    return "This field does not match the expected format";
                };
                return RegexValidationRule;
            }());
            exports_1("RegexValidationRule", RegexValidationRule);
        }
    }
});
