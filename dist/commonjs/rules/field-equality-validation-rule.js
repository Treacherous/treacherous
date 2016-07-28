"use strict";
var type_helper_1 = require("../helpers/type-helper");
var comparer_helper_1 = require("../helpers/comparer-helper");
var FieldEqualityValidationRule = (function () {
    function FieldEqualityValidationRule() {
        this.ruleName = "fieldEquality";
    }
    FieldEqualityValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        var result;
        var comparison = modelResolver.resolve(optionsOrValue.value || optionsOrValue);
        var weakEquality = optionsOrValue.weakEquality || false;
        if (type_helper_1.TypeHelper.isDateType(comparison)) {
            result = comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison);
        }
        else {
            result = comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality);
        }
        return Promise.resolve(result);
    };
    FieldEqualityValidationRule.prototype.getMessage = function (modelResolver, propertyName, optionsOrValue) {
        var field1 = modelResolver.resolve(propertyName);
        var field2 = modelResolver.resolve(optionsOrValue.value || optionsOrValue);
        return "Field " + propertyName + " should be equal to " + (optionsOrValue.value || optionsOrValue);
    };
    return FieldEqualityValidationRule;
}());
exports.FieldEqualityValidationRule = FieldEqualityValidationRule;
