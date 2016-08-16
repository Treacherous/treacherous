(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var DecimalValidationRule = (function () {
        function DecimalValidationRule() {
            this.ruleName = "decimal";
            this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
        }
        DecimalValidationRule.prototype.validate = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var matchesRegex = this.decimalRegex.test(value);
            return Promise.resolve(matchesRegex);
        };
        DecimalValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains " + value + " which is not a decimal value";
        };
        return DecimalValidationRule;
    }());
    exports.DecimalValidationRule = DecimalValidationRule;
});
