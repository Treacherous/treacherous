(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var PropertyWatcher = (function () {
        function PropertyWatcher(propertyPath, previousValue) {
            this.propertyPath = propertyPath;
            this.previousValue = previousValue;
        }
        return PropertyWatcher;
    }());
    exports.PropertyWatcher = PropertyWatcher;
});
