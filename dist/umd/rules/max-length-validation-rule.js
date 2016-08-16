(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MaxLengthValidationRule = (function () {
        function MaxLengthValidationRule() {
            this.ruleName = "maxLength";
        }
        MaxLengthValidationRule.prototype.validate = function (modelResolver, propertyName, maxLength) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return Promise.resolve(true);
            }
            if (value.length <= maxLength) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        MaxLengthValidationRule.prototype.getMessage = function (modelResolver, propertyName, maxLength) {
            var value = modelResolver.resolve(propertyName);
            return "This field has a length of " + value.length + " but should contain no more than " + maxLength;
        };
        return MaxLengthValidationRule;
    }());
    exports.MaxLengthValidationRule = MaxLengthValidationRule;
});
