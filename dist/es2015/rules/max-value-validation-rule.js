import * as tslib_1 from "tslib";
export class MaxValueValidationRule {
    constructor() {
        this.ruleName = "maxValue";
    }
    validate(modelResolver, propertyName, maxValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null || value.length == 0) {
                return true;
            }
            return value <= maxValue;
        });
    }
}
