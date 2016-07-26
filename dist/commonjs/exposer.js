"use strict";
var validation_group_factory_1 = require("./factories/validation-group-factory");
var field_error_processor_1 = require("./processors/field-error-processor");
var rule_registry_1 = require("./rules/rule-registry");
var date_validation_rule_1 = require("./rules/date-validation-rule");
var decimal_validation_rule_1 = require("./rules/decimal-validation-rule");
var email_validation_rule_1 = require("./rules/email-validation-rule");
var equal_validation_rule_1 = require("./rules/equal-validation-rule");
var iso_date_validation_rule_1 = require("./rules/iso-date-validation-rule");
var max_length_validation_rule_1 = require("./rules/max-length-validation-rule");
var max_value_validation_rule_1 = require("./rules/max-value-validation-rule");
var min_length_validation_rule_1 = require("./rules/min-length-validation-rule");
var min_value_validation_rule_1 = require("./rules/min-value-validation-rule");
var not_equal_validation_rule_1 = require("./rules/not-equal-validation-rule");
var number_validation_rule_1 = require("./rules/number-validation-rule");
var regex_validation_rule_1 = require("./rules/regex-validation-rule");
var required_validation_rule_1 = require("./rules/required-validation-rule");
var step_validation_rule_1 = require("./rules/step-validation-rule");
var ruleset_builder_1 = require("./rulesets/ruleset-builder");
var property_resolver_1 = require("property-resolver");
var rule_resolver_1 = require("./rulesets/rule-resolver");
exports.ruleRegistry = new rule_registry_1.RuleRegistry();
exports.ruleRegistry.registerRule(new date_validation_rule_1.DateValidationRule());
exports.ruleRegistry.registerRule(new decimal_validation_rule_1.DecimalValidationRule());
exports.ruleRegistry.registerRule(new email_validation_rule_1.EmailValidationRule());
exports.ruleRegistry.registerRule(new equal_validation_rule_1.EqualValidationRule());
exports.ruleRegistry.registerRule(new iso_date_validation_rule_1.ISODateValidationRule());
exports.ruleRegistry.registerRule(new max_length_validation_rule_1.MaxLengthValidationRule());
exports.ruleRegistry.registerRule(new max_value_validation_rule_1.MaxValueValidationRule());
exports.ruleRegistry.registerRule(new min_length_validation_rule_1.MinLengthValidationRule());
exports.ruleRegistry.registerRule(new min_value_validation_rule_1.MinValueValidationRule());
exports.ruleRegistry.registerRule(new not_equal_validation_rule_1.NotEqualValidationRule());
exports.ruleRegistry.registerRule(new number_validation_rule_1.NumberValidationRule());
exports.ruleRegistry.registerRule(new regex_validation_rule_1.RegexValidationRule());
exports.ruleRegistry.registerRule(new required_validation_rule_1.RequiredValidationRule());
exports.ruleRegistry.registerRule(new step_validation_rule_1.StepValidationRule());
var fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(exports.ruleRegistry);
var propertyResolver = new property_resolver_1.PropertyResolver();
var ruleResolver = new rule_resolver_1.RuleResolver();
var validationGroupFactory = new validation_group_factory_1.ValidationGroupFactory(fieldErrorProcessor, ruleResolver);
function createRuleset() {
    return new ruleset_builder_1.RulesetBuilder().create();
}
exports.createRuleset = createRuleset;
function createGroupWithRules(model, rulesCreator) {
    var ruleset = rulesCreator(new ruleset_builder_1.RulesetBuilder());
    return validationGroupFactory.createValidationGroup(model, ruleset);
}
exports.createGroupWithRules = createGroupWithRules;
function createGroup(model, ruleset) {
    return validationGroupFactory.createValidationGroup(model, ruleset);
}
exports.createGroup = createGroup;
