export class RegexValidationRule {
    constructor() {
        this.ruleName = "regex";
    }
    async validate(modelResolver, propertyName, regexPattern) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value.toString().match(regexPattern) !== null;
    }
    getMessage(modelResolver, propertyName, regexPattern) {
        return `This field does not match the expected format`;
    }
}
