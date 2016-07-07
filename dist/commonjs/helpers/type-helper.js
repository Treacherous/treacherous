var TypeHelper = (function () {
    function TypeHelper() {
    }
    TypeHelper.isDateType = function (value) {
        return (typeof value.getMonth === 'function');
    };
    TypeHelper.isSimpleType = function (value) {
        return (typeof value == "string" || typeof value == "number");
    };
    TypeHelper.isArrayType = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };
    return TypeHelper;
})();
exports.TypeHelper = TypeHelper;
