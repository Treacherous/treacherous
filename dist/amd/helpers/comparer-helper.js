define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
