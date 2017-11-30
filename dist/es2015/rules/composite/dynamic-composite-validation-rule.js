export class DynamicCompositeValidationRule {
    constructor(virtualPropertyName, validate) {
        this.virtualPropertyName = virtualPropertyName;
        this.validate = validate;
    }
}
