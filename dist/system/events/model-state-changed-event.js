System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelStateChangedEvent;
    return {
        setters:[],
        execute: function() {
            ModelStateChangedEvent = (function () {
                function ModelStateChangedEvent(isValid) {
                    this.isValid = isValid;
                }
                return ModelStateChangedEvent;
            }());
            exports_1("ModelStateChangedEvent", ModelStateChangedEvent);
        }
    }
});
