(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MinLengthValidationRule = (function () {
        function MinLengthValidationRule() {
            this.ruleName = "minLength";
        }
        MinLengthValidationRule.prototype.validate = function (modelResolver, propertyName, minLength) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return Promise.resolve(true);
            }
            if (value.length >= minLength) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        MinLengthValidationRule.prototype.getMessage = function (modelResolver, propertyName, minLength) {
            var value = modelResolver.resolve(propertyName);
            return "This field has a length of " + value.length + " but should more than " + minLength;
        };
        return MinLengthValidationRule;
    }());
    exports.MinLengthValidationRule = MinLengthValidationRule;
});
