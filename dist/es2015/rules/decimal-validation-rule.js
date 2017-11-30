import * as tslib_1 from "tslib";
export class DecimalValidationRule {
    constructor() {
        this.ruleName = "decimal";
        this.decimalRegex = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    }
    validate(modelResolver, propertyName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return true;
            }
            return this.decimalRegex.test(value);
        });
    }
}
