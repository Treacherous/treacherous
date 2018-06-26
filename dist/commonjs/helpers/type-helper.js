"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeHelper = /** @class */ (function () {
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
    TypeHelper.isEmptyValue = function (value) {
        return value === undefined || value === null || value.length == 0;
    };
    TypeHelper.isObjectOrArray = function (value) {
        return (!!value) && (value.constructor === Array || value.constructor === Object);
    };
    TypeHelper.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    TypeHelper.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    return TypeHelper;
}());
exports.TypeHelper = TypeHelper;
