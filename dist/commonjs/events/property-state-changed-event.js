"use strict";
var PropertyStateChangedEvent = (function () {
    function PropertyStateChangedEvent(property, isValid, error) {
        this.property = property;
        this.isValid = isValid;
        this.error = error;
    }
    return PropertyStateChangedEvent;
}());
exports.PropertyStateChangedEvent = PropertyStateChangedEvent;
