"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError = /** @class */ (function () {
    function ValidationError(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
