System.register(["../helpers/type-helper", "../helpers/comparer-helper"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var type_helper_1, comparer_helper_1;
    var EqualValidationRule;
    return {
        setters:[
            function (type_helper_1_1) {
                type_helper_1 = type_helper_1_1;
            },
            function (comparer_helper_1_1) {
                comparer_helper_1 = comparer_helper_1_1;
            }],
        execute: function() {
            EqualValidationRule = (function () {
                function EqualValidationRule() {
                    this.ruleName = "equal";
                }
                EqualValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
                    var value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return Promise.resolve(true);
                    }
                    var result;
                    var comparison = optionsOrValue.value || optionsOrValue;
                    var weakEquality = optionsOrValue.weakEquality || false;
                    if (type_helper_1.TypeHelper.isFunctionType(comparison)) {
                        comparison = comparison();
                    }
                    if (type_helper_1.TypeHelper.isDateType(comparison)) {
                        result = comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
                    }
                    else {
                        result = comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
                    }
                    return Promise.resolve(result);
                };
                EqualValidationRule.prototype.getMessage = function (modelResolver, propertyName, optionsOrValue) {
                    var value = modelResolver.resolve(propertyName);
                    return "This field is " + value + " but should be equal to " + (optionsOrValue.value || optionsOrValue);
                };
                return EqualValidationRule;
            }());
            exports_1("EqualValidationRule", EqualValidationRule);
        }
    }
});
