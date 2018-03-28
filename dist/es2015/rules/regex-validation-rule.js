import * as tslib_1 from "tslib";
import { TypeHelper } from "../helpers/type-helper";
export class RegexValidationRule {
    constructor() {
        this.ruleName = "regex";
    }
    validate(modelResolver, propertyName, regexPattern) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (TypeHelper.isEmptyValue(value)) {
                return true;
            }
            return value.toString().match(regexPattern) !== null;
        });
    }
}
