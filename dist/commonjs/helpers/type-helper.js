"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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