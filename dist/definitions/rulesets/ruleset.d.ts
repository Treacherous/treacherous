import { RuleLink } from "./rule-link";
import { ForEachRule } from "./for-each-rule";
import { ICompositeValidationRule } from "../rules/composite/icomposite-validation-rule";
export declare type RulesetRulesType = {
    [key: string]: Array<any>;
};
export declare class Ruleset {
    rules: RulesetRulesType;
    compositeRules: any;
    propertyDisplayNames: any;
    private createPropertyEntryIfNeeded;
    addRule: (property: string, ruleLink: RuleLink | ForEachRule<RuleLink>) => void;
    addRuleset: (property: string, ruleset: Ruleset | ForEachRule<Ruleset>) => void;
    addCompositeRule: (compositeRule: ICompositeValidationRule) => void;
    addPropertyDisplayName: (propertyName: string, displayName: string) => string;
    getRulesForProperty: (property: string) => any[];
    getCompositeRulesRulesForProperty: (propertyName: string) => any[];
}
