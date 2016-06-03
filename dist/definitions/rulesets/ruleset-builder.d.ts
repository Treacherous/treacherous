import { Ruleset } from "./ruleset";
export declare class RulesetBuilder {
    private internalRuleset;
    currentProperty: string;
    create: () => RulesetBuilder;
    forProperty: (propertyName: string) => RulesetBuilder;
    addRule: (rule: string, ruleOptions: any, messageOverride?: (value: any, ruleOptions?: any) => string) => RulesetBuilder;
    addRuleForEach: (rule: string, ruleOptions: any, messageOverride?: (value: any, ruleOptions?: any) => string) => RulesetBuilder;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder;
    build: () => Ruleset;
}
