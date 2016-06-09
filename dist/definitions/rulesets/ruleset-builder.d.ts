import { Ruleset } from "./ruleset";
import { RuleLink } from "./rule-link";
import { RuleRegistry } from "../rules/rule-registry";
export declare class RulesetBuilder {
    private ruleRegistry;
    private internalRuleset;
    currentProperty: string;
    currentRule: RuleLink;
    constructor(ruleRegistry: RuleRegistry);
    create: () => RulesetBuilder;
    forProperty: (propertyName: string) => RulesetBuilder;
    addRule: (rule: string, ruleOptions?: any) => RulesetBuilder;
    withMessage: (messageOverride: ((value: any, ruleOptions?: any) => string) | string) => RulesetBuilder;
    addRuleForEach: (rule: string, ruleOptions?: any) => RulesetBuilder;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder;
    build: () => Ruleset;
}
