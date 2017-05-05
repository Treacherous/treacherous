System.register(["./rules/rule-registry", "./rules/date-validation-rule", "./rules/decimal-validation-rule", "./rules/email-validation-rule", "./rules/equal-validation-rule", "./rules/iso-date-validation-rule", "./rules/max-length-validation-rule", "./rules/max-value-validation-rule", "./rules/min-length-validation-rule", "./rules/min-value-validation-rule", "./rules/not-equal-validation-rule", "./rules/number-validation-rule", "./rules/regex-validation-rule", "./rules/required-validation-rule", "./rules/step-validation-rule", "./rules/matches-validation-rule"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rule_registry_1, date_validation_rule_1, decimal_validation_rule_1, email_validation_rule_1, equal_validation_rule_1, iso_date_validation_rule_1, max_length_validation_rule_1, max_value_validation_rule_1, min_length_validation_rule_1, min_value_validation_rule_1, not_equal_validation_rule_1, number_validation_rule_1, regex_validation_rule_1, required_validation_rule_1, step_validation_rule_1, matches_validation_rule_1, ruleRegistry;
    return {
        setters: [
            function (rule_registry_1_1) {
                rule_registry_1 = rule_registry_1_1;
            },
            function (date_validation_rule_1_1) {
                date_validation_rule_1 = date_validation_rule_1_1;
            },
            function (decimal_validation_rule_1_1) {
                decimal_validation_rule_1 = decimal_validation_rule_1_1;
            },
            function (email_validation_rule_1_1) {
                email_validation_rule_1 = email_validation_rule_1_1;
            },
            function (equal_validation_rule_1_1) {
                equal_validation_rule_1 = equal_validation_rule_1_1;
            },
            function (iso_date_validation_rule_1_1) {
                iso_date_validation_rule_1 = iso_date_validation_rule_1_1;
            },
            function (max_length_validation_rule_1_1) {
                max_length_validation_rule_1 = max_length_validation_rule_1_1;
            },
            function (max_value_validation_rule_1_1) {
                max_value_validation_rule_1 = max_value_validation_rule_1_1;
            },
            function (min_length_validation_rule_1_1) {
                min_length_validation_rule_1 = min_length_validation_rule_1_1;
            },
            function (min_value_validation_rule_1_1) {
                min_value_validation_rule_1 = min_value_validation_rule_1_1;
            },
            function (not_equal_validation_rule_1_1) {
                not_equal_validation_rule_1 = not_equal_validation_rule_1_1;
            },
            function (number_validation_rule_1_1) {
                number_validation_rule_1 = number_validation_rule_1_1;
            },
            function (regex_validation_rule_1_1) {
                regex_validation_rule_1 = regex_validation_rule_1_1;
            },
            function (required_validation_rule_1_1) {
                required_validation_rule_1 = required_validation_rule_1_1;
            },
            function (step_validation_rule_1_1) {
                step_validation_rule_1 = step_validation_rule_1_1;
            },
            function (matches_validation_rule_1_1) {
                matches_validation_rule_1 = matches_validation_rule_1_1;
            }
        ],
        execute: function () {
            if (!ruleRegistry) {
                exports_1("ruleRegistry", ruleRegistry = new rule_registry_1.RuleRegistry());
                ruleRegistry.registerRule(new date_validation_rule_1.DateValidationRule());
                ruleRegistry.registerRule(new decimal_validation_rule_1.DecimalValidationRule());
                ruleRegistry.registerRule(new email_validation_rule_1.EmailValidationRule());
                ruleRegistry.registerRule(new equal_validation_rule_1.EqualValidationRule());
                ruleRegistry.registerRule(new iso_date_validation_rule_1.ISODateValidationRule());
                ruleRegistry.registerRule(new max_length_validation_rule_1.MaxLengthValidationRule());
                ruleRegistry.registerRule(new max_value_validation_rule_1.MaxValueValidationRule());
                ruleRegistry.registerRule(new min_length_validation_rule_1.MinLengthValidationRule());
                ruleRegistry.registerRule(new min_value_validation_rule_1.MinValueValidationRule());
                ruleRegistry.registerRule(new not_equal_validation_rule_1.NotEqualValidationRule());
                ruleRegistry.registerRule(new number_validation_rule_1.NumberValidationRule());
                ruleRegistry.registerRule(new regex_validation_rule_1.RegexValidationRule());
                ruleRegistry.registerRule(new required_validation_rule_1.RequiredValidationRule());
                ruleRegistry.registerRule(new step_validation_rule_1.StepValidationRule());
                ruleRegistry.registerRule(new matches_validation_rule_1.MatchesValidationRule());
            }
        }
    };
});
