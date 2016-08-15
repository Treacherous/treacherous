import { Ruleset } from "../rulesets/ruleset";
import { RuleLink } from "../rulesets/rule-link";
import { RuleRegistry } from "../rules/rule-registry";
export declare class RulesetBuilder<T> {
    private ruleRegistry;
    protected internalRuleset: Ruleset;
    protected currentProperty: string;
    protected currentRule: RuleLink;
    constructor(ruleRegistry?: RuleRegistry);
    protected extractPropertyName(predicate: (model: T) => any): string;
    create: () => RulesetBuilder<T>;
    forProperty: (propertyNameOrPredicate: ((model: T) => any) | string) => RulesetBuilder<T>;
    addRule: (rule: string, ruleOptions?: any) => RulesetBuilder<T>;
    withMessage: (messageOverride: ((value: any, ruleOptions?: any) => string) | string) => RulesetBuilder<T>;
    appliesIf: (appliesFunction: ((model: any, value: any, ruleOptions?: any) => boolean) | boolean) => RulesetBuilder<T>;
    addRuleForEach: (rule: string, ruleOptions?: any) => RulesetBuilder<T>;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder<T>;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder<T>;
    build: () => Ruleset;
}
