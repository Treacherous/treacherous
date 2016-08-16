define(["require", "exports", "./rules/rule-registry", "./rules/date-validation-rule", "./rules/decimal-validation-rule", "./rules/email-validation-rule", "./rules/equal-validation-rule", "./rules/iso-date-validation-rule", "./rules/max-length-validation-rule", "./rules/max-value-validation-rule", "./rules/min-length-validation-rule", "./rules/min-value-validation-rule", "./rules/not-equal-validation-rule", "./rules/number-validation-rule", "./rules/regex-validation-rule", "./rules/required-validation-rule", "./rules/step-validation-rule", "./rules/matches-validation-rule"], function (require, exports, rule_registry_1, date_validation_rule_1, decimal_validation_rule_1, email_validation_rule_1, equal_validation_rule_1, iso_date_validation_rule_1, max_length_validation_rule_1, max_value_validation_rule_1, min_length_validation_rule_1, min_value_validation_rule_1, not_equal_validation_rule_1, number_validation_rule_1, regex_validation_rule_1, required_validation_rule_1, step_validation_rule_1, matches_validation_rule_1) {
    "use strict";
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
