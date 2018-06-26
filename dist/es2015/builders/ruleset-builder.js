import { Ruleset } from "../rulesets/ruleset";
import { RuleLink } from "../rulesets/rule-link";
import { ForEachRule } from "../rulesets/for-each-rule";
import { TypeHelper } from "../helpers/type-helper";
import { DynamicCompositeValidationRule } from "../rules/composite/dynamic-composite-validation-rule";
export class RulesetBuilder {
    constructor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
        this.verifyExistingProperty = () => {
            if (!this.currentProperty) {
                throw new Error("A property must precede any rule calls in the chain");
            }
        };
        this.verifyRuleNameIsValid = (rule) => {
            if (rule == null || typeof (rule) == "undefined" || rule.length == 0) {
                throw new Error("A rule name is required");
            }
            if (this.ruleRegistry && !this.ruleRegistry.hasRuleNamed(rule)) {
                throw new Error(`The rule [${rule}] has not been registered`);
            }
        };
        this.create = (templateRuleset) => {
            this.internalRuleset = templateRuleset || new Ruleset();
            this.currentProperty = null;
            return this;
        };
        this.mergeInRuleset = (ruleset) => {
            this.internalRuleset.rules = Object.assign({}, this.internalRuleset.rules, ruleset.rules);
            this.internalRuleset.compositeRules = Object.assign({}, this.internalRuleset.compositeRules, ruleset.compositeRules);
            this.internalRuleset.propertyDisplayNames = Object.assign({}, this.internalRuleset.propertyDisplayNames, ruleset.propertyDisplayNames);
            return this;
        };
        this.forProperty = (propertyNameOrPredicate) => {
            let endProperty = propertyNameOrPredicate;
            if (TypeHelper.isFunctionType(endProperty)) {
                endProperty = this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`);
                }
            }
            this.currentProperty = endProperty;
            this.currentRule = null;
            return this;
        };
        this.then = (builderMethod) => {
            this.verifyExistingProperty();
            const subBuilder = new RulesetBuilder().create();
            builderMethod(subBuilder);
            const ruleset = subBuilder.build();
            return this.addRuleset(ruleset);
        };
        this.thenForEach = (builderMethod) => {
            this.verifyExistingProperty();
            const subBuilder = new RulesetBuilder().create();
            builderMethod(subBuilder);
            const ruleset = subBuilder.build();
            return this.addRulesetForEach(ruleset);
        };
        this.addRule = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            this.internalRuleset.addRule(this.currentProperty, this.currentRule = new RuleLink(rule, ruleOptions));
            return this;
        };
        this.addCompositeRule = (compositeRule) => {
            this.internalRuleset.compositeRules[compositeRule.virtualPropertyName] = compositeRule;
            return this;
        };
        this.withDisplayName = (displayName) => {
            this.verifyExistingProperty();
            this.internalRuleset.propertyDisplayNames[this.currentProperty] = displayName;
            return this;
        };
        this.addDynamicRule = (virtualPropertyName, validate) => {
            const compositeRule = new DynamicCompositeValidationRule(virtualPropertyName, validate);
            this.internalRuleset.compositeRules[virtualPropertyName] = compositeRule;
            return this;
        };
        this.withMessage = (messageOverride) => {
            this.verifyExistingProperty();
            this.currentRule.messageOverride = messageOverride;
            return this;
        };
        this.appliesIf = (appliesFunction) => {
            this.verifyExistingProperty();
            this.currentRule.appliesIf = appliesFunction;
            return this;
        };
        this.addRuleForEach = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            const ruleLink = new RuleLink(rule, ruleOptions);
            this.currentRule = ruleLink;
            this.internalRuleset.addRule(this.currentProperty, new ForEachRule(ruleLink));
            return this;
        };
        this.addRuleset = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, ruleset);
            return this;
        };
        this.addRulesetForEach = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, new ForEachRule(ruleset));
            return this;
        };
        this.build = () => {
            return this.internalRuleset;
        };
        // Shorthands
        this.required = () => this.addRule("required");
        this.date = () => this.addRule("date");
        this.decimal = () => this.addRule("decimal");
        this.email = () => this.addRule("email");
        this.isoDate = () => this.addRule("isoDate");
        this.number = () => this.addRule("number");
        this.equal = (value) => this.addRule("equal", value);
        this.notEqual = (value) => this.addRule("notEqual", value);
        this.minValue = (value) => this.addRule("minValue", value);
        this.maxValue = (value) => this.addRule("maxValue", value);
        this.minLength = (value) => this.addRule("minLength", value);
        this.maxLength = (value) => this.addRule("maxLength", value);
        this.regex = (pattern) => this.addRule("regex", pattern);
        this.step = (step) => this.addRule("step", step);
        this.matches = (propertyNameOrPredicate) => {
            let endProperty = propertyNameOrPredicate;
            if (TypeHelper.isFunctionType(endProperty)) {
                endProperty = this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`);
                }
            }
            return this.addRule("matches", endProperty);
        };
    }
    extractPropertyName(predicate) {
        const regex = /.*\.([\w]*)/;
        const predicateString = predicate.toString();
        return regex.exec(predicateString)[1];
    }
    static create(templateRuleset) { return new RulesetBuilder().create(templateRuleset); }
}
