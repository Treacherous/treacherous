export class DateValidationRule {
    constructor() {
        this.ruleName = "date";
        this.invalidObjectRegex = /Invalid|NaN/;
    }
    async validate(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return true;
        }
        return !this.invalidObjectRegex.test(new Date(value));
    }
    getMessage(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains "${value}" which is not a valid date`;
    }
}
