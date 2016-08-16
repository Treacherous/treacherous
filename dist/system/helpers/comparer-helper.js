System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComparerHelper;
    return {
        setters:[],
        execute: function() {
            ComparerHelper = (function () {
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
            exports_1("ComparerHelper", ComparerHelper);
        }
    }
});
