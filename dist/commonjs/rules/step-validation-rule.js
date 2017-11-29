"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StepValidationRule = /** @class */ (function () {
    function StepValidationRule() {
        this.ruleName = "step";
    }
    StepValidationRule.prototype.validate = function (modelResolver, propertyName, step) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value, dif;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null) {
                    return [2 /*return*/, Promise.resolve(true)];
                }
                dif = (value * 100) % (step * 100);
                return [2 /*return*/, Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001];
            });
        });
    };
    return StepValidationRule;
}());
exports.StepValidationRule = StepValidationRule;
