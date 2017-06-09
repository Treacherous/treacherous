define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RegexValidationRule = (function () {
        function RegexValidationRule() {
            this.ruleName = "regex";
        }
        RegexValidationRule.prototype.validate = function (modelResolver, propertyName, regexPattern) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null || value.length == 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, value.toString().match(regexPattern) !== null];
                });
            });
        };
        RegexValidationRule.prototype.getMessage = function (modelResolver, propertyName, regexPattern) {
            return "This field does not match the expected format";
        };
        return RegexValidationRule;
    }());
    exports.RegexValidationRule = RegexValidationRule;
});
