define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PropertyWatcher = (function () {
        function PropertyWatcher(propertyPath, previousValue) {
            this.propertyPath = propertyPath;
            this.previousValue = previousValue;
        }
        return PropertyWatcher;
    }());
    exports.PropertyWatcher = PropertyWatcher;
});
