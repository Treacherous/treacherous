import { RuleRegistry } from "./rules/rule-registry";
import { Ruleset } from "./rulesets/ruleset";
import { RulesetBuilder } from "./rulesets/ruleset-builder";
import { ValidationGroup } from "./validation-group";
import { IValidationSettings } from "./settings/ivalidation-settings";
export declare var ruleRegistry: RuleRegistry;
export declare function createRuleset(): RulesetBuilder;
export declare function createGroupWithRules(model: any, rulesCreator: (rulesetBuilder: RulesetBuilder) => Ruleset, validationSettings?: IValidationSettings): ValidationGroup;
export declare function createGroup(model: any, ruleset: Ruleset, validationSettings?: IValidationSettings): ValidationGroup;
