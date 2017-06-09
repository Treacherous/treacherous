define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MinValueValidationRule = (function () {
        function MinValueValidationRule() {
            this.ruleName = "minValue";
        }
        MinValueValidationRule.prototype.validate = function (modelResolver, propertyName, minValue) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null || value.length == 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, value >= minValue];
                });
            });
        };
        MinValueValidationRule.prototype.getMessage = function (modelResolver, propertyName, minValue) {
            var value = modelResolver.resolve(propertyName);
            return "This field has a value of " + value + " but should be greater than or equal to " + minValue;
        };
        return MinValueValidationRule;
    }());
    exports.MinValueValidationRule = MinValueValidationRule;
});
