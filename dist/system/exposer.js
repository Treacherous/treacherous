System.register(["./processors/field-error-processor", "./rulesets/rule-resolver", "./builders/validation-group-builder", "./rule-registry-setup", "./builders/ruleset-builder"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var field_error_processor_1, rule_resolver_1, validation_group_builder_1, rule_registry_setup_1, ruleset_builder_1;
    var fieldErrorProcessor, ruleResolver;
    function createRuleset(withRuleVerification) {
        if (withRuleVerification === void 0) { withRuleVerification = false; }
        var rulesetBuilder = withRuleVerification ? new ruleset_builder_1.RulesetBuilder(rule_registry_setup_1.ruleRegistry) : new ruleset_builder_1.RulesetBuilder();
        return rulesetBuilder.create();
    }
    exports_1("createRuleset", createRuleset);
    function createGroup() {
        return new validation_group_builder_1.ValidationGroupBuilder(fieldErrorProcessor, ruleResolver).create();
    }
    exports_1("createGroup", createGroup);
    return {
        setters:[
            function (field_error_processor_1_1) {
                field_error_processor_1 = field_error_processor_1_1;
            },
            function (rule_resolver_1_1) {
                rule_resolver_1 = rule_resolver_1_1;
            },
            function (validation_group_builder_1_1) {
                validation_group_builder_1 = validation_group_builder_1_1;
            },
            function (rule_registry_setup_1_1) {
                rule_registry_setup_1 = rule_registry_setup_1_1;
            },
            function (ruleset_builder_1_1) {
                ruleset_builder_1 = ruleset_builder_1_1;
            }],
        execute: function() {
            fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(rule_registry_setup_1.ruleRegistry);
            ruleResolver = new rule_resolver_1.RuleResolver();
        }
    }
});
