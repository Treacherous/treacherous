export class MaxValueValidationRule {
    constructor() {
        this.ruleName = "maxValue";
    }
    async validate(modelResolver, propertyName, maxValue) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value <= maxValue;
    }
    getMessage(modelResolver, propertyName, maxValue) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} but should be less than or equal to ${maxValue}`;
    }
}
