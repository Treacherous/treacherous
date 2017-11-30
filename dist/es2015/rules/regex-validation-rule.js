import * as tslib_1 from "tslib";
export class RegexValidationRule {
    constructor() {
        this.ruleName = "regex";
    }
    validate(modelResolver, propertyName, regexPattern) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return true;
            }
            return value.toString().match(regexPattern) !== null;
        });
    }
}
