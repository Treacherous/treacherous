import { Ruleset } from "./ruleset";
import { RuleLink } from "./rule-link";
export declare class RulesetBuilder {
    private internalRuleset;
    currentProperty: string;
    currentRule: RuleLink;
    create: () => RulesetBuilder;
    forProperty: (propertyName: string) => RulesetBuilder;
    addRule: (rule: string, ruleOptions?: any) => RulesetBuilder;
    withMessage: (messageOverride: ((value: any, ruleOptions?: any) => string) | string) => RulesetBuilder;
    addRuleForEach: (rule: string, ruleOptions?: any) => RulesetBuilder;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder;
    build: () => Ruleset;
}
