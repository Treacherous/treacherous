"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var field_error_processor_1 = require("./processors/field-error-processor");
var rule_resolver_1 = require("./rulesets/rule-resolver");
var validation_group_builder_1 = require("./builders/validation-group-builder");
var rule_registry_setup_1 = require("./rule-registry-setup");
var ruleset_builder_1 = require("./builders/ruleset-builder");
var default_locale_handler_1 = require("./localization/default-locale-handler");
var en_us_1 = require("./locales/en-us");
var defaultLocaleCode = "en-us";
var defaultLocaleHandler = new default_locale_handler_1.DefaultLocaleHandler();
defaultLocaleHandler.registerLocale(defaultLocaleCode, en_us_1.locale);
defaultLocaleHandler.useLocale(defaultLocaleCode);
var fieldErrorProcessor = new field_error_processor_1.FieldErrorProcessor(rule_registry_setup_1.ruleRegistry, defaultLocaleHandler);
var ruleResolver = new rule_resolver_1.RuleResolver();
function createRuleset(withRuleVerification) {
    if (withRuleVerification === void 0) { withRuleVerification = false; }
    var rulesetBuilder = withRuleVerification ? new ruleset_builder_1.RulesetBuilder(rule_registry_setup_1.ruleRegistry) : new ruleset_builder_1.RulesetBuilder();
    return rulesetBuilder.create();
}
exports.createRuleset = createRuleset;
function createGroup() { return new validation_group_builder_1.ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultLocaleHandler).create(); }
exports.createGroup = createGroup;
exports.localeHandler = defaultLocaleHandler;
function supplementLocale(localeCode, localeResource) {
    defaultLocaleHandler.supplementLocaleFrom(localeCode, localeResource);
}
exports.supplementLocale = supplementLocale;
