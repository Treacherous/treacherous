define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateValidationRule = (function () {
        function DateValidationRule() {
            this.ruleName = "date";
            this.invalidObjectRegex = /Invalid|NaN/;
        }
        DateValidationRule.prototype.validate = function (modelResolver, propertyName) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, !this.invalidObjectRegex.test(new Date(value))];
                });
            });
        };
        DateValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains \"" + value + "\" which is not a valid date";
        };
        return DateValidationRule;
    }());
    exports.DateValidationRule = DateValidationRule;
});
