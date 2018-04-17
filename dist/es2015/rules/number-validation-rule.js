import * as tslib_1 from "tslib";
import { TypeHelper } from "../helpers/type-helper";
export class NumberValidationRule {
    constructor() {
        this.ruleName = "number";
        this.numberRegex = /^\d+$/;
    }
    validate(modelResolver, propertyName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (TypeHelper.isEmptyValue(value)) {
                return true;
            }
            return this.numberRegex.test(value);
        });
    }
}
