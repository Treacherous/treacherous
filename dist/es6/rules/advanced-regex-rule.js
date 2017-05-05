export class AdvancedRegexValidationRule {
    constructor(ruleName, expression, message) {
        if (!ruleName || ruleName.length == 0) {
            throw new Error("ruleName is required, an empty rule name is invalid");
        }
        if (!expression || expression.length == 0) {
            throw new Error("expression is required, an empty regex expression is invalid");
        }
        this.ruleName = ruleName;
        this.expression = expression;
        this.message = (typeof message === "function") ? message : () => { return message; };
    }
    async validate(modelResolver, propertyName, regexPattern) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null || value.length == 0) {
            return true;
        }
        return value.toString().match(this.expression) !== null;
    }
    getMessage(modelResolver, propertyName, regexPattern) {
        let value = modelResolver.resolve(propertyName);
        return this.message(value);
    }
}
