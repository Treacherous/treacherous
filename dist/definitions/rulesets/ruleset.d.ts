import { RuleLink } from "./rule-link";
import { ForEachRule } from "./for-each-rule";
export declare class Ruleset {
    rules: {};
    private createPropertyEntryIfNeeded;
    addRule: (property: string, ruleLink: RuleLink | ForEachRule<RuleLink>) => void;
    addRuleset: (property: string, ruleset: Ruleset | ForEachRule<Ruleset>) => void;
    getRulesForProperty: (property: string) => any[];
}
