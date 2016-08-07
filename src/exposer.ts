import {FieldErrorProcessor} from "./processors/field-error-processor";
import {RulesetBuilder} from "./builders/ruleset-builder";
import {RuleResolver} from "./rulesets/rule-resolver";
import {ValidationGroupBuilder} from "./builders/validation-group-builder";
import {ruleRegistry} from "./rule-registry-setup";

var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
var ruleResolver = new RuleResolver();

export function createRuleset(withRuleVerification = false): RulesetBuilder
{
    var rulesetBuilder = withRuleVerification ? new RulesetBuilder(ruleRegistry) : new RulesetBuilder();
    return rulesetBuilder.create();
}

export function createGroup(): ValidationGroupBuilder
{
    return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver).create();
}