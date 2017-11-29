"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var MaxLengthValidationRule = /** @class */ (function () {
    function MaxLengthValidationRule() {
        this.ruleName = "maxLength";
    }
    MaxLengthValidationRule.prototype.validate = function (modelResolver, propertyName, maxLength) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null || value.length == 0) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, value.length <= maxLength];
            });
        });
    };
    return MaxLengthValidationRule;
}());
exports.MaxLengthValidationRule = MaxLengthValidationRule;
