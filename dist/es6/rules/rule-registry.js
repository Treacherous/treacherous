export class RuleRegistry {
    constructor() {
        this.rules = {};
        this.registerRule = (validationRule) => {
            this.rules[validationRule.ruleName] = validationRule;
        };
        this.unregisterRule = (validationRule) => {
            delete this.rules[validationRule.ruleName];
        };
        this.getRuleNamed = (ruleName) => {
            return this.rules[ruleName] || null;
        };
        this.hasRuleNamed = (ruleName) => {
            return this.getRuleNamed(ruleName) != null;
        };
    }
}
