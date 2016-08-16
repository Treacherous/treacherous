"use strict";
var ValidationError = (function () {
    function ValidationError(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
