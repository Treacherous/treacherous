export class MinLengthValidationRule {
    constructor() {
        this.ruleName = "minLength";
    }
    async validate(modelResolver, propertyName, minLength) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value.length >= minLength;
    }
    getMessage(modelResolver, propertyName, minLength) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a length of ${value.length} but should more than ${minLength}`;
    }
}
