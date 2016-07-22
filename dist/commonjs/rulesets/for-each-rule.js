"use strict";
var ForEachRule = (function () {
    function ForEachRule(internalRule) {
        this.internalRule = internalRule;
        this.isForEach = true;
    }
    return ForEachRule;
}());
exports.ForEachRule = ForEachRule;
