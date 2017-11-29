"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdvancedRegexValidationRule = /** @class */ (function () {
    function AdvancedRegexValidationRule(ruleName, expression) {
        if (!ruleName || ruleName.length == 0) {
            throw new Error("ruleName is required, an empty rule name is invalid");
        }
        if (!expression || expression.length == 0) {
            throw new Error("expression is required, an empty regex expression is invalid");
        }
        this.ruleName = ruleName;
        this.expression = expression;
    }
    AdvancedRegexValidationRule.prototype.validate = function (modelResolver, propertyName, regexPattern) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null || value.length == 0) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, value.toString().match(this.expression) !== null];
            });
        });
    };
    return AdvancedRegexValidationRule;
}());
exports.AdvancedRegexValidationRule = AdvancedRegexValidationRule;
