export class DecimalValidationRule {
    constructor() {
        this.ruleName = "decimal";
        this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    }
    async validate(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return true;
        }
        return this.decimalRegex.test(value);
    }
    getMessage(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains ${value} which is not a decimal value`;
    }
}
