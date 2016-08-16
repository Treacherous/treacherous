(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ISODateValidationRule = (function () {
        function ISODateValidationRule() {
            this.ruleName = "isoDate";
            this.isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
        }
        ISODateValidationRule.prototype.validate = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            var matchesRegex = this.isoDateRegex.test(value);
            return Promise.resolve(matchesRegex);
        };
        ISODateValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains \"" + value + "\" which is not a valid ISO date";
        };
        return ISODateValidationRule;
    }());
    exports.ISODateValidationRule = ISODateValidationRule;
});
