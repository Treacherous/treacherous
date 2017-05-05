System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PropertyStateChangedEvent;
    return {
        setters: [],
        execute: function () {
            PropertyStateChangedEvent = (function () {
                function PropertyStateChangedEvent(property, isValid, error) {
                    this.property = property;
                    this.isValid = isValid;
                    this.error = error;
                }
                return PropertyStateChangedEvent;
            }());
            exports_1("PropertyStateChangedEvent", PropertyStateChangedEvent);
        }
    };
});
