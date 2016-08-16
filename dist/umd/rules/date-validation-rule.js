(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var DateValidationRule = (function () {
        function DateValidationRule() {
            this.ruleName = "date";
            this.invalidObjectRegex = /Invalid|NaN/;
        }
        DateValidationRule.prototype.validate = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var matchesRegex = !this.invalidObjectRegex.test(new Date(value));
            return Promise.resolve(matchesRegex);
        };
        DateValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains \"" + value + "\" which is not a valid date";
        };
        return DateValidationRule;
    }());
    exports.DateValidationRule = DateValidationRule;
});
