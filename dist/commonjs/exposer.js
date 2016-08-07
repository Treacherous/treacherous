"use strict";
var field_error_processor_1 = require("./processors/field-error-processor");
var ruleset_builder_1 = require("./builders/ruleset-builder");
var property_resolver_1 = require("property-resolver");
var rule_resolver_1 = require("./rulesets/rule-resolver");
var default_validation_settings_1 = require("./settings/default-validation-settings");
var validation_group_builder_1 = require("./builders/validation-group-builder");
var rule_registry_setup_1 = require("./rule-registry-setup");
var fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(rule_registry_setup_1.ruleRegistry);
var propertyResolver = new property_resolver_1.PropertyResolver();
var ruleResolver = new rule_resolver_1.RuleResolver();
var defaultValidationSettings = new default_validation_settings_1.DefaultValidationSettings(propertyResolver);
function createRuleset(withRuleVerification) {
    if (withRuleVerification === void 0) { withRuleVerification = false; }
    var rulesetBuilder = withRuleVerification ? new ruleset_builder_1.RulesetBuilder(rule_registry_setup_1.ruleRegistry) : new ruleset_builder_1.RulesetBuilder();
    return rulesetBuilder.create();
}
exports.createRuleset = createRuleset;
function createGroup() {
    return new validation_group_builder_1.ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultValidationSettings).create();
}
exports.createGroup = createGroup;
