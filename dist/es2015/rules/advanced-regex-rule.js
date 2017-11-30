import * as tslib_1 from "tslib";
export class AdvancedRegexValidationRule {
    constructor(ruleName, expression) {
        if (!ruleName || ruleName.length == 0) {
            throw new Error("ruleName is required, an empty rule name is invalid");
        }
        if (!expression || expression.length == 0) {
            throw new Error("expression is required, an empty regex expression is invalid");
        }
        this.ruleName = ruleName;
        this.expression = expression;
    }
    validate(modelResolver, propertyName, regexPattern) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return true;
            }
            return value.toString().match(this.expression) !== null;
        });
    }
}
