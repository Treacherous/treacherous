(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var PropertyChangedEvent = (function () {
        function PropertyChangedEvent(propertyPath, newValue, oldValue) {
            this.propertyPath = propertyPath;
            this.newValue = newValue;
            this.oldValue = oldValue;
        }
        return PropertyChangedEvent;
    }());
    exports.PropertyChangedEvent = PropertyChangedEvent;
});
