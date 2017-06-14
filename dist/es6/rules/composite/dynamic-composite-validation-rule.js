export class DynamicCompositeValidationRule {
    constructor(virtualPropertyName, validate, message) {
        this.virtualPropertyName = virtualPropertyName;
        this.validate = validate;
        this.message = message;
    }
    getMessage(modelResolver) {
        if (typeof (this.message) === "function") {
            return this.message(modelResolver);
        }
        else {
            return this.message;
        }
    }
}
