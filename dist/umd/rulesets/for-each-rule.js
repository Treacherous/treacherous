(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ForEachRule = (function () {
        function ForEachRule(internalRule) {
            this.internalRule = internalRule;
            this.isForEach = true;
        }
        return ForEachRule;
    }());
    exports.ForEachRule = ForEachRule;
});
