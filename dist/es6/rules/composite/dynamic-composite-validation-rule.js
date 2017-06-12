export class DynamicCompositeValidationRule {
    constructor(propertyName, validate, getMessage) {
        this.propertyName = propertyName;
        this.validate = validate;
        this.getMessage = getMessage;
    }
}
