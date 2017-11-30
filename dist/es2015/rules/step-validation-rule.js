import * as tslib_1 from "tslib";
export class StepValidationRule {
    constructor() {
        this.ruleName = "step";
    }
    validate(modelResolver, propertyName, step) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return Promise.resolve(true);
            }
            const dif = (value * 100) % (step * 100);
            return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        });
    }
}
