(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var TypeHelper = (function () {
        function TypeHelper() {
        }
        TypeHelper.isDateType = function (value) {
            return (typeof value.getMonth === 'function');
        };
        TypeHelper.isFunctionType = function (value) {
            return (typeof value === 'function');
        };
        TypeHelper.isSimpleType = function (value) {
            return (typeof value == "string" || typeof value == "number");
        };
        TypeHelper.isArrayType = function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
        return TypeHelper;
    }());
    exports.TypeHelper = TypeHelper;
});
