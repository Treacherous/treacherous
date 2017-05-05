export class NumberValidationRule {
    constructor() {
        this.ruleName = "number";
        this.numberRegex = /^\d+$/;
    }
    async validate(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return true;
        }
        return this.numberRegex.test(value);
    }
    getMessage(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a numeric value`;
    }
}
