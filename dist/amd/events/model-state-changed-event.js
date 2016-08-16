define(["require", "exports"], function (require, exports) {
    "use strict";
    var ModelStateChangedEvent = (function () {
        function ModelStateChangedEvent(isValid) {
            this.isValid = isValid;
        }
        return ModelStateChangedEvent;
    }());
    exports.ModelStateChangedEvent = ModelStateChangedEvent;
});
