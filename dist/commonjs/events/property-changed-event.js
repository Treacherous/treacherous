"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyChangedEvent = (function () {
    function PropertyChangedEvent(propertyPath, newValue, oldValue) {
        this.propertyPath = propertyPath;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }
    return PropertyChangedEvent;
}());
exports.PropertyChangedEvent = PropertyChangedEvent;
