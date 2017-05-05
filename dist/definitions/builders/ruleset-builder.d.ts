import { Ruleset } from "../rulesets/ruleset";
import { RuleLink } from "../rulesets/rule-link";
import { RuleRegistry } from "../rules/rule-registry";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class RulesetBuilder<T> {
    private ruleRegistry;
    protected internalRuleset: Ruleset;
    protected currentProperty: string;
    protected currentRule: RuleLink;
    constructor(ruleRegistry?: RuleRegistry);
    protected extractPropertyName(predicate: (model: T) => any): string;
    protected verifyExistingProperty: () => void;
    protected verifyRuleNameIsValid: (rule: any) => void;
    create: () => RulesetBuilder<T>;
    forProperty: (propertyNameOrPredicate: string | ((model: T) => any)) => RulesetBuilder<T>;
    addRule: (rule: string, ruleOptions?: any) => RulesetBuilder<T>;
    withMessage: (messageOverride: string | ((value: any, ruleOptions?: any) => string)) => RulesetBuilder<T>;
    appliesIf: (appliesFunction: boolean | ((modelResolver: IModelResolver, value: any, ruleOptions?: any) => boolean)) => RulesetBuilder<T>;
    addRuleForEach: (rule: string, ruleOptions?: any) => RulesetBuilder<T>;
    addRuleset: (ruleset: Ruleset) => RulesetBuilder<T>;
    addRulesetForEach: (ruleset: Ruleset) => RulesetBuilder<T>;
    build: () => Ruleset;
}
