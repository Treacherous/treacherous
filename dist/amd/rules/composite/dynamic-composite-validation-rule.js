define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DynamicCompositeValidationRule = (function () {
        function DynamicCompositeValidationRule(propertyName, validate, getMessage) {
            this.propertyName = propertyName;
            this.validate = validate;
            this.getMessage = getMessage;
        }
        return DynamicCompositeValidationRule;
    }());
    exports.DynamicCompositeValidationRule = DynamicCompositeValidationRule;
});
