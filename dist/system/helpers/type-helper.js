System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TypeHelper;
    return {
        setters:[],
        execute: function() {
            TypeHelper = (function () {
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
            exports_1("TypeHelper", TypeHelper);
        }
    }
});
