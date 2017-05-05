System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PropertyChangedEvent;
    return {
        setters: [],
        execute: function () {
            PropertyChangedEvent = (function () {
                function PropertyChangedEvent(propertyPath, newValue, oldValue) {
                    this.propertyPath = propertyPath;
                    this.newValue = newValue;
                    this.oldValue = oldValue;
                }
                return PropertyChangedEvent;
            }());
            exports_1("PropertyChangedEvent", PropertyChangedEvent);
        }
    };
});
