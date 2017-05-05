import { FieldHasError } from "./field-has-error";
export class FieldErrorProcessor {
    constructor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
    }
    // Validates a single property against a model
    async processRuleLink(modelResolver, propertyName, ruleLink) {
        var shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof (ruleLink.appliesIf) === "function")
                ? (ruleLink.appliesIf)(modelResolver, propertyName, ruleLink.ruleOptions)
                : false);
        if (!shouldRuleApply) {
            return;
        }
        let validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
        let options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
        let isValid = await validator.validate(modelResolver, propertyName, options);
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
            error = validator.getMessage(modelResolver, propertyName, ruleLink.ruleOptions);
        }
        throw new FieldHasError(error);
    }
    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    checkFieldForErrors(modelResolver, propertyName, rules) {
        let ruleCheck = (ruleLinkOrSet) => {
            return this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
        };
        let checkEachRule = (rules) => {
            let promises = [];
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
    }
}
