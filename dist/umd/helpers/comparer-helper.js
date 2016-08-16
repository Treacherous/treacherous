(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ComparerHelper = (function () {
        function ComparerHelper() {
        }
        ComparerHelper.simpleTypeComparer = function (value1, value2, isWeak) {
            if (isWeak) {
                return (value1 == value2);
            }
            return (value1 === value2);
        };
        ComparerHelper.dateTimeCompararer = function (value1, value2) { return (value1.getTime() == value2.getTime()); };
        return ComparerHelper;
    }());
    exports.ComparerHelper = ComparerHelper;
});
