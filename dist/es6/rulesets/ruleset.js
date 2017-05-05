export class Ruleset {
    constructor() {
        this.rules = {};
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
        this.getRulesForProperty = (property) => { return this.rules[property]; };
    }
}
