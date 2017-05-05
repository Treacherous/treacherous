export class RequiredValidationRule {
    constructor() {
        this.ruleName = "required";
    }
    async validate(modelResolver, propertyName, isRequired = true) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return !isRequired;
        }
        let testValue = value;
        if (typeof (testValue) === 'string') {
            if (String.prototype.trim) {
                testValue = value.trim();
            }
            else {
                testValue = value.replace(/^\s+|\s+$/g, '');
            }
        }
        if (!isRequired) {
            return true;
        }
        return (testValue + '').length > 0;
    }
    getMessage(modelResolver, propertyName, isRequired) {
        return "This field is required";
    }
}
