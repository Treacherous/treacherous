define(["require", "exports", "./processors/field-error-processor", "./rulesets/rule-resolver", "./builders/validation-group-builder", "./rule-registry-setup", "./builders/ruleset-builder"], function (require, exports, field_error_processor_1, rule_resolver_1, validation_group_builder_1, rule_registry_setup_1, ruleset_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(rule_registry_setup_1.ruleRegistry);
    var ruleResolver = new rule_resolver_1.RuleResolver();
    function createRuleset(withRuleVerification) {
        if (withRuleVerification === void 0) { withRuleVerification = false; }
        var rulesetBuilder = withRuleVerification ? new ruleset_builder_1.RulesetBuilder(rule_registry_setup_1.ruleRegistry) : new ruleset_builder_1.RulesetBuilder();
        return rulesetBuilder.create();
    }
    exports.createRuleset = createRuleset;
    function createGroup() {
        return new validation_group_builder_1.ValidationGroupBuilder(fieldErrorProcessor, ruleResolver).create();
    }
    exports.createGroup = createGroup;
});
