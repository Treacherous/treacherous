define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PropertyStateChangedEvent = (function () {
        function PropertyStateChangedEvent(property, isValid, error) {
            this.property = property;
            this.isValid = isValid;
            this.error = error;
        }
        return PropertyStateChangedEvent;
    }());
    exports.PropertyStateChangedEvent = PropertyStateChangedEvent;
});
