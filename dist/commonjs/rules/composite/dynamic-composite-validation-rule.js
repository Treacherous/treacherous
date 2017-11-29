"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicCompositeValidationRule = /** @class */ (function () {
    function DynamicCompositeValidationRule(virtualPropertyName, validate, message) {
        this.virtualPropertyName = virtualPropertyName;
        this.validate = validate;
        this.message = message;
    }
    DynamicCompositeValidationRule.prototype.getMessage = function (modelResolver) {
        if (typeof (this.message) === "function") {
            return this.message(modelResolver);
        }
        else {
            return this.message;
        }
    };
    return DynamicCompositeValidationRule;
}());
exports.DynamicCompositeValidationRule = DynamicCompositeValidationRule;
