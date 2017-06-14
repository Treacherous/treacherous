export class Ruleset {
    constructor() {
        this.rules = {};
        this.compositeRules = {};
        this.propertyDisplayNames = {};
        this.createPropertyEntryIfNeeded = (property) => {
            if (!this.rules[property]) {
                this.rules[property] = [];
            }
        };
        this.addRule = (property, ruleLink) => {
            this.createPropertyEntryIfNeeded(property);
            this.rules[property].push(ruleLink);
        };
        this.addRuleset = (property, ruleset) => {
            this.createPropertyEntryIfNeeded(property);
            this.rules[property].push(ruleset);
        };
        this.addCompositeRule = (compositeRule) => { this.compositeRules[compositeRule.propertyName] = compositeRule; };
        this.addPropertyDisplayName = (propertyName, displayName) => { return this.propertyDisplayNames[propertyName] = displayName; };
        this.getRulesForProperty = (property) => { return this.rules[property]; };
        this.getCompositeRulesRulesForProperty = (propertyName) => { return this.compositeRules[propertyName]; };
        this.getPropertyDisplayName = (propertyName) => { return this.propertyDisplayNames[propertyName]; };
    }
}
