"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NumberValidationRule = (function () {
    function NumberValidationRule() {
        this.ruleName = "number";
        this.numberRegex = /^\d+$/;
    }
    NumberValidationRule.prototype.validate = function (modelResolver, propertyName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, this.numberRegex.test(value)];
            });
        });
    };
    NumberValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
        var value = modelResolver.resolve(propertyName);
        return "This field contains " + value + " which is not a numeric value";
    };
    return NumberValidationRule;
}());
exports.NumberValidationRule = NumberValidationRule;
