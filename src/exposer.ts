import {FieldErrorProcessor} from "./processors/field-error-processor";
import {RulesetBuilder} from "./builders/ruleset-builder";
import {PropertyResolver} from "property-resolver";
import {RuleResolver} from "./rulesets/rule-resolver";
import {DefaultValidationSettings} from "./settings/default-validation-settings";
import {ValidationGroupBuilder} from "./builders/validation-group-builder";
import {ruleRegistry} from "./rule-registry-setup";

var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
var propertyResolver = new PropertyResolver();
var ruleResolver = new RuleResolver();
var defaultValidationSettings = new DefaultValidationSettings(propertyResolver);

export function createRuleset(withRuleVerification = false): RulesetBuilder
{
    var rulesetBuilder = withRuleVerification ? new RulesetBuilder(ruleRegistry) : new RulesetBuilder();
    return rulesetBuilder.create();
}

export function createGroup(): ValidationGroupBuilder
{
    return new ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultValidationSettings).create();
}