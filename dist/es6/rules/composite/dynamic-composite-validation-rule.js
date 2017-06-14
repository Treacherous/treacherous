export class DynamicCompositeValidationRule {
    constructor(propertyName, validate, message) {
        this.propertyName = propertyName;
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
