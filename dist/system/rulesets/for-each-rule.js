System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ForEachRule;
    return {
        setters:[],
        execute: function() {
            ForEachRule = (function () {
                function ForEachRule(internalRule) {
                    this.internalRule = internalRule;
                    this.isForEach = true;
                }
                return ForEachRule;
            }());
            exports_1("ForEachRule", ForEachRule);
        }
    }
});
