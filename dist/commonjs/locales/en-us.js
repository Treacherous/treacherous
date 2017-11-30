"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locale = {
    "default": "This field is invalid",
    "required": "This field is required",
    "date": function (value) { return "This field contains \"" + value + "\" which is not a valid date"; },
    "decimal": function (value) { return "This field contains " + value + " which is not a decimal value"; },
    "equal": function (value, optionsOrValue) { return "This field is " + value + " but should be equal to " + (optionsOrValue.value || optionsOrValue); },
    "notEqual": function (value, optionsOrValue) { return "This field is " + value + " but should not be equal to " + (optionsOrValue.value || optionsOrValue); },
    "isoDate": function (value) { return "This field contains \"" + value + "\" which is not a valid ISO date"; },
    "maxLength": function (value, maxLength) { return "This field has a length of " + value.length + " but should contain no more than " + maxLength; },
    "minLength": function (value, minLength) { return "This field has a length of " + value.length + " but should more than " + minLength; },
    "maxValue": function (value, maxValue) { return "This field has a value of " + value + " but should be less than or equal to " + maxValue; },
    "minValue": function (value, minValue) { return "This field has a value of " + value + " but should be greater than or equal to " + minValue; },
    "number": function (value) { return "This field contains " + value + " which is not a numeric value"; },
    "regex": "This field does not match the expected format",
    "step": function (value, step) { return "This field has a value of " + value + " and should be an increment of " + step; },
    "matches": function (modelResolver, propertyName, optionsOrProperty) {
        var value = modelResolver.resolve(propertyName);
        var fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        var matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return "This field is " + value + " but should match " + matchingFieldValue;
    },
};
