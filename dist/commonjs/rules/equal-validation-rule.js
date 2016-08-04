"use strict";
var type_helper_1 = require("../helpers/type-helper");
var comparer_helper_1 = require("../helpers/comparer-helper");
var EqualValidationRule = (function () {
    function EqualValidationRule() {
        this.ruleName = "equal";
    }
    EqualValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var result;
        //var comparison = (typeof optionsOrValue == "function") ? optionsOrValue() : optionsOrValue.value || optionsOrValue;
        var comparison = optionsOrValue.value || optionsOrValue;
        var weakEquality = optionsOrValue.weakEquality || false;
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
exports.EqualValidationRule = EqualValidationRule;
