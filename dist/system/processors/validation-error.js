System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidationError;
    return {
        setters:[],
        execute: function() {
            ValidationError = (function () {
                function ValidationError(propertyName, message) {
                    this.propertyName = propertyName;
                    this.message = message;
                }
                return ValidationError;
            }());
            exports_1("ValidationError", ValidationError);
        }
    }
});
