(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ValidationError = (function () {
        function ValidationError(propertyName, message) {
            this.propertyName = propertyName;
            this.message = message;
        }
        return ValidationError;
    }());
    exports.ValidationError = ValidationError;
});
