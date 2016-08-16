define(["require", "exports"], function (require, exports) {
    "use strict";
    var AdvancedRegexValidationRule = (function () {
        function AdvancedRegexValidationRule(ruleName, expression, message) {
            if (!ruleName || ruleName.length == 0) {
                throw new Error("ruleName is required, an empty rule name is invalid");
            }
            if (!expression || expression.length == 0) {
                throw new Error("expression is required, an empty regex expression is invalid");
            }
            this.ruleName = ruleName;
            this.expression = expression;
            this.message = (typeof message === "function") ? message : function () { return message; };
        }
        AdvancedRegexValidationRule.prototype.validate = function (modelResolver, propertyName, regexPattern) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return Promise.resolve(true);
            }
            var matchesPattern = value.toString().match(this.expression) !== null;
            return Promise.resolve(matchesPattern);
        };
        AdvancedRegexValidationRule.prototype.getMessage = function (modelResolver, propertyName, regexPattern) {
            var value = modelResolver.resolve(propertyName);
            return this.message(value);
        };
        return AdvancedRegexValidationRule;
    }());
    exports.AdvancedRegexValidationRule = AdvancedRegexValidationRule;
});
