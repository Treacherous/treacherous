import {ValidationGroupFactory} from "./factories/validation-group-factory";
import {FieldErrorProcessor} from "./processors/field-error-processor";
import {RuleRegistry} from "./rules/rule-registry";
import {Ruleset} from "./rulesets/ruleset";

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
import {RequiredValidaitonRule} from "./rules/required-validation-rule"
import {StepValidationRule} from "./rules/step-validation-rule"
import {RulesetBuilder} from "./rulesets/ruleset-builder";
import {ValidationGroup} from "./validation-group";
import {ModelWatcher} from "./watcher/model-watcher";
import {PropertyResolver} from "property-resolver";
import {RuleResolver} from "./rulesets/rule-resolver";

export var ruleRegistry = new RuleRegistry();
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
ruleRegistry.registerRule(new RequiredValidaitonRule());
ruleRegistry.registerRule(new StepValidationRule());

var fieldErrorProcessor = new FieldErrorProcessor(ruleRegistry);
var modelWatcher = new ModelWatcher();
var propertyResolver = new PropertyResolver();
var ruleResolver = new RuleResolver();
var validationGroupFactory = new ValidationGroupFactory(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver);

export function createRuleset(): RulesetBuilder
{
    return new RulesetBuilder(ruleRegistry).create();
}

export function createGroupWithRules(model: any, rulesCreator: (rulesetBuilder: RulesetBuilder) => Ruleset): ValidationGroup
{
    var ruleset = rulesCreator(new RulesetBuilder(ruleRegistry));
    return validationGroupFactory.createValidationGroup(model, ruleset);
}

export function createGroup(model: any, ruleset: Ruleset): ValidationGroup
{
    return validationGroupFactory.createValidationGroup(model, ruleset);
}