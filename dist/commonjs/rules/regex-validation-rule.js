"use strict";
var RegexValidationRule = (function () {
    function RegexValidationRule() {
        this.ruleName = "regex";
    }
    RegexValidationRule.prototype.validate = function (modelHelper, propertyName, regexPattern) {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return Promise.resolve(true);
        }
        var matchesPattern = value.toString().match(regexPattern) !== null;
        return Promise.resolve(matchesPattern);
    };
    RegexValidationRule.prototype.getMessage = function (modelHelper, propertyName, regexPattern) {
        return "This field does not match the expected format";
    };
    return RegexValidationRule;
}());
exports.RegexValidationRule = RegexValidationRule;
