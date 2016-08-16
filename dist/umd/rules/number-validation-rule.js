(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var NumberValidationRule = (function () {
        function NumberValidationRule() {
            this.ruleName = "number";
            this.numberRegex = /^\d+$/;
        }
        NumberValidationRule.prototype.validate = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var matchesRegex = this.numberRegex.test(value);
            return Promise.resolve(matchesRegex);
        };
        NumberValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains " + value + " which is not a numeric value";
        };
        return NumberValidationRule;
    }());
    exports.NumberValidationRule = NumberValidationRule;
});
