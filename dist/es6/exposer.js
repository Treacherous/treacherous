import { FieldErrorProcessor } from "./processors/field-error-processor";
import { RuleResolver } from "./rulesets/rule-resolver";
import { ValidationGroupBuilder } from "./builders/validation-group-builder";
import { ruleRegistry } from "./rule-registry-setup";
import { RulesetBuilder } from "./builders/ruleset-builder";
var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
var ruleResolver = new RuleResolver();
export function createRuleset(withRuleVerification = false) {
    var rulesetBuilder = withRuleVerification ? new RulesetBuilder(ruleRegistry) : new RulesetBuilder();
    return rulesetBuilder.create();
}
export function createGroup() {
    return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver).create();
}
