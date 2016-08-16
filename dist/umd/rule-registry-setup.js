(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./rules/rule-registry", "./rules/date-validation-rule", "./rules/decimal-validation-rule", "./rules/email-validation-rule", "./rules/equal-validation-rule", "./rules/iso-date-validation-rule", "./rules/max-length-validation-rule", "./rules/max-value-validation-rule", "./rules/min-length-validation-rule", "./rules/min-value-validation-rule", "./rules/not-equal-validation-rule", "./rules/number-validation-rule", "./rules/regex-validation-rule", "./rules/required-validation-rule", "./rules/step-validation-rule", "./rules/matches-validation-rule"], factory);
    }
})(function (require, exports) {
    "use strict";
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
    var matches_validation_rule_1 = require("./rules/matches-validation-rule");
    if (!exports.ruleRegistry) {
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
        exports.ruleRegistry.registerRule(new matches_validation_rule_1.MatchesValidationRule());
    }
});
