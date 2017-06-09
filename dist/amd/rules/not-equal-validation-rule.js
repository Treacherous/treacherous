define(["require", "exports", "tslib", "../helpers/type-helper", "../helpers/comparer-helper"], function (require, exports, tslib_1, type_helper_1, comparer_helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotEqualValidationRule = (function () {
        function NotEqualValidationRule() {
            this.ruleName = "notEqual";
        }
        NotEqualValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, comparison, weakEquality;
                return tslib_1.__generator(this, function (_a) {
                    value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return [2 /*return*/, true];
                    }
                    comparison = optionsOrValue.value || optionsOrValue;
                    weakEquality = optionsOrValue.weakEquality || false;
                    if (type_helper_1.TypeHelper.isFunctionType(comparison)) {
                        comparison = comparison();
                    }
                    if (type_helper_1.TypeHelper.isDateType(comparison)) {
                        return [2 /*return*/, !comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison)];
                    }
                    else {
                        return [2 /*return*/, !comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        NotEqualValidationRule.prototype.getMessage = function (modelResolver, propertyName, optionsOrValue) {
            var value = modelResolver.resolve(propertyName);
            return "This field is " + value + " but should not be equal to " + (optionsOrValue.value || optionsOrValue);
        };
        return NotEqualValidationRule;
    }());
    exports.NotEqualValidationRule = NotEqualValidationRule;
});
