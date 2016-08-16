(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
});
