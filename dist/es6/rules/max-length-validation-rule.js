export class MaxLengthValidationRule {
    constructor() {
        this.ruleName = "maxLength";
    }
    async validate(modelResolver, propertyName, maxLength) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value.length <= maxLength;
    }
    getMessage(modelResolver, propertyName, maxLength) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a length of ${value.length} but should contain no more than ${maxLength}`;
    }
}
