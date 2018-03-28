import * as tslib_1 from "tslib";
import { FieldHasError } from "./field-has-error";
export class FieldErrorProcessor {
    constructor(ruleRegistry, localeHandler) {
        this.ruleRegistry = ruleRegistry;
        this.localeHandler = localeHandler;
        this.processRuleLink = (modelResolver, propertyName, ruleLink) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const shouldRuleApply = ruleLink.appliesIf === true
                || ((typeof (ruleLink.appliesIf) === "function")
                    ? (ruleLink.appliesIf)(modelResolver, propertyName, ruleLink.ruleOptions)
                    : false);
            if (!shouldRuleApply) {
                return;
            }
            const validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
            if (!validator) {
                throw new FieldHasError(`No validator can be found for rule [${ruleLink.ruleName}]`);
            }
            const options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
            const isValid = yield validator.validate(modelResolver, propertyName, options);
            if (isValid) {
                return;
            }
            let error;
            if (ruleLink.messageOverride) {
                if (typeof (ruleLink.messageOverride) === "function") {
                    error = (ruleLink.messageOverride)(modelResolver, propertyName, ruleLink.ruleOptions);
                }
                else {
                    error = ruleLink.messageOverride;
                }
            }
            else {
                error = yield this.localeHandler.getMessage(ruleLink.ruleName, ruleLink.ruleOptions, modelResolver, propertyName);
            }
            throw new FieldHasError(error);
        });
        this.checkFieldForErrors = (modelResolver, propertyName, rules) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ruleCheck = (ruleLinkOrSet) => {
                return this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
            };
            const checkEachRule = (rules) => {
                const promises = [];
                rules.forEach((rule) => {
                    promises.push(ruleCheck(rule));
                });
                return Promise.all(promises);
            };
            return Promise.resolve(rules)
                .then(checkEachRule)
                .then(function () { return null; })
                .catch((validationError) => {
                return validationError.message;
            });
        });
    }
}
