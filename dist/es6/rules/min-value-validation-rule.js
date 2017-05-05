export class MinValueValidationRule {
    constructor() {
        this.ruleName = "minValue";
    }
    async validate(modelResolver, propertyName, minValue) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value >= minValue;
    }
    getMessage(modelResolver, propertyName, minValue) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} but should be greater than or equal to ${minValue}`;
    }
}
