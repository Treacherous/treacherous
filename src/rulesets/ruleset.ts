import {RuleLink} from "./rule-link";
import {ForEachRule} from "./for-each-rule";

export class Ruleset
{
    public rules = {};

    private createPropertyEntryIfNeeded = (property: string): void =>
    {
        if(!this.rules[property]) {
            this.rules[property] = [];
        }
    }

    public addRule = (property: string, ruleLink: RuleLink | ForEachRule<RuleLink>): void => {
        this.createPropertyEntryIfNeeded(property);
        this.rules[property].push(ruleLink);
    }

    public addRuleset = (property: string, ruleset: Ruleset | ForEachRule<Ruleset>): void => {
        this.createPropertyEntryIfNeeded(property);
        this.rules[property].push(ruleset);
    }

    public getRulesForProperty = (property: string): Array<any> =>
    { return this.rules[property]; }
}