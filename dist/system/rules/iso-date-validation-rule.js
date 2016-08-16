System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ISODateValidationRule;
    return {
        setters:[],
        execute: function() {
            ISODateValidationRule = (function () {
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
            exports_1("ISODateValidationRule", ISODateValidationRule);
        }
    }
});
