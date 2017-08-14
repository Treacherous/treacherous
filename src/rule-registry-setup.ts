import {RuleRegistry} from "./rules/rule-registry";

import {DateValidationRule} from "./rules/date-validation-rule"
import {DecimalValidationRule} from "./rules/decimal-validation-rule"
import {EmailValidationRule} from "./rules/email-validation-rule"
import {EqualValidationRule} from "./rules/equal-validation-rule"
import {ISODateValidationRule} from "./rules/iso-date-validation-rule"
import {MaxLengthValidationRule} from "./rules/max-length-validation-rule"
import {MaxValueValidationRule} from "./rules/max-value-validation-rule"
import {MinLengthValidationRule} from "./rules/min-length-validation-rule"
import {MinValueValidationRule} from "./rules/min-value-validation-rule"
import {NotEqualValidationRule} from "./rules/not-equal-validation-rule"
import {NumberValidationRule} from "./rules/number-validation-rule"
import {RegexValidationRule} from "./rules/regex-validation-rule"
import {RequiredValidationRule} from "./rules/required-validation-rule"
import {StepValidationRule} from "./rules/step-validation-rule"
import {MatchesValidationRule} from "./rules/matches-validation-rule";

export var ruleRegistry: RuleRegistry;

if(!ruleRegistry) {
    ruleRegistry = new RuleRegistry();
    ruleRegistry.registerRule(new DateValidationRule());
    ruleRegistry.registerRule(new DecimalValidationRule());
    ruleRegistry.registerRule(new EmailValidationRule());
    ruleRegistry.registerRule(new EqualValidationRule());
    ruleRegistry.registerRule(new ISODateValidationRule());
    ruleRegistry.registerRule(new MaxLengthValidationRule());
    ruleRegistry.registerRule(new MaxValueValidationRule());
    ruleRegistry.registerRule(new MinLengthValidationRule());
    ruleRegistry.registerRule(new MinValueValidationRule());
    ruleRegistry.registerRule(new NotEqualValidationRule());
    ruleRegistry.registerRule(new NumberValidationRule());
    ruleRegistry.registerRule(new RegexValidationRule());
    ruleRegistry.registerRule(new RequiredValidationRule());
    ruleRegistry.registerRule(new StepValidationRule());
    ruleRegistry.registerRule(new MatchesValidationRule());
}
