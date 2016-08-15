import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { RulesetBuilder } from "./builders/ruleset-builder";
export declare function createRuleset<T>(withRuleVerification?: boolean): RulesetBuilder<T>;
export declare function createGroup(): ValidationGroupBuilder;
