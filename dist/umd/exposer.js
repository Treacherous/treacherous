(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./processors/field-error-processor", "./rulesets/rule-resolver", "./builders/validation-group-builder", "./rule-registry-setup", "./builders/ruleset-builder"], factory);
    }
})(function (require, exports) {
    "use strict";
    var field_error_processor_1 = require("./processors/field-error-processor");
    var rule_resolver_1 = require("./rulesets/rule-resolver");
    var validation_group_builder_1 = require("./builders/validation-group-builder");
    var rule_registry_setup_1 = require("./rule-registry-setup");
    var ruleset_builder_1 = require("./builders/ruleset-builder");
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
