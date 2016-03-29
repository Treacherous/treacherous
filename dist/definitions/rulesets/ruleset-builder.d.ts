import { Ruleset } from "./ruleset";
export declare class RulesetBuilder {
    private internalRuleset;
    currentProperty: string;
    create: () => RulesetBuilder;
    forProperty: (propertyName: string) => RulesetBuilder;
    addRule: (rule: string, ruleOptions: any) => RulesetBuilder;
    addRuleForEach: (rule: string, ruleOptions: any) => RulesetBuilder;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder;
    build: () => Ruleset;
}
