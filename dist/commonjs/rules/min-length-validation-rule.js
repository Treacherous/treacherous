"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MinLengthValidationRule = (function () {
    function MinLengthValidationRule() {
        this.ruleName = "minLength";
    }
    MinLengthValidationRule.prototype.validate = function (modelResolver, propertyName, minLength) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null || value.length == 0) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, value.length >= minLength];
            });
        });
    };
    MinLengthValidationRule.prototype.getMessage = function (modelResolver, propertyName, minLength) {
        var value = modelResolver.resolve(propertyName);
        return "This field has a length of " + value.length + " but should more than " + minLength;
    };
    return MinLengthValidationRule;
}());
exports.MinLengthValidationRule = MinLengthValidationRule;
