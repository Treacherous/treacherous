import * as tslib_1 from "tslib";
export class MinLengthValidationRule {
    constructor() {
        this.ruleName = "minLength";
    }
    validate(modelResolver, propertyName, minLength) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return true;
            }
            return value.length >= minLength;
        });
    }
}
