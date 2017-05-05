System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PropertyWatcher;
    return {
        setters: [],
        execute: function () {
            PropertyWatcher = (function () {
                function PropertyWatcher(propertyPath, previousValue) {
                    this.propertyPath = propertyPath;
                    this.previousValue = previousValue;
                }
                return PropertyWatcher;
            }());
            exports_1("PropertyWatcher", PropertyWatcher);
        }
    };
});
