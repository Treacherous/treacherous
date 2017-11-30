import * as tslib_1 from "tslib";
export class RequiredValidationRule {
    constructor() {
        this.ruleName = "required";
    }
    validate(modelResolver, propertyName, isRequired = true) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const value = modelResolver.resolve(propertyName);
            if (value === undefined || value === null) {
                return !isRequired;
            }
            let testValue = value;
            if (typeof (testValue) === 'string') {
                if (String.prototype.trim) {
                    testValue = value.trim();
                }
                else {
                    testValue = value.replace(/^\s+|\s+$/g, '');
                }
            }
            if (!isRequired) {
                return true;
            }
            return (testValue + '').length > 0;
        });
    }
}
