"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ruleset_1 = require("../rulesets/ruleset");
var rule_link_1 = require("../rulesets/rule-link");
var for_each_rule_1 = require("../rulesets/for-each-rule");
var type_helper_1 = require("../helpers/type-helper");
var dynamic_composite_validation_rule_1 = require("../rules/composite/dynamic-composite-validation-rule");
var RulesetBuilder = (function () {
    function RulesetBuilder(ruleRegistry) {
        var _this = this;
        this.ruleRegistry = ruleRegistry;
        this.verifyExistingProperty = function () {
            if (!_this.currentProperty) {
                throw new Error("A property must precede any rule calls in the chain");
            }
        };
        this.verifyRuleNameIsValid = function (rule) {
            if (rule == null || typeof (rule) == "undefined" || rule.length == 0) {
                throw new Error("A rule name is required");
            }
            if (_this.ruleRegistry && !_this.ruleRegistry.hasRuleNamed(rule)) {
                throw new Error("The rule [" + rule + "] has not been registered");
            }
        };
        this.create = function () {
            _this.internalRuleset = new ruleset_1.Ruleset();
            _this.currentProperty = null;
            return _this;
        };
        this.forProperty = function (propertyNameOrPredicate) {
            var endProperty = propertyNameOrPredicate;
            if (type_helper_1.TypeHelper.isFunctionType(endProperty)) {
                endProperty = _this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error("cannot resolve property from: " + propertyNameOrPredicate);
                }
            }
            _this.currentProperty = endProperty;
            _this.currentRule = null;
            return _this;
        };
        this.addRule = function (rule, ruleOptions) {
            _this.verifyRuleNameIsValid(rule);
            _this.verifyExistingProperty();
            _this.internalRuleset.addRule(_this.currentProperty, _this.currentRule = new rule_link_1.RuleLink(rule, ruleOptions));
            return _this;
        };
        this.addCompositeRule = function (compositeRule) {
            _this.internalRuleset.compositeRules[compositeRule.virtualPropertyName] = compositeRule;
            return _this;
        };
        this.withDisplayName = function (displayName) {
            _this.verifyExistingProperty();
            _this.internalRuleset.propertyDisplayNames[_this.currentProperty] = displayName;
            return _this;
        };
        this.addDynamicRule = function (virtualPropertyName, validate, getMessage) {
            var compositeRule = new dynamic_composite_validation_rule_1.DynamicCompositeValidationRule(virtualPropertyName, validate, getMessage);
            _this.internalRuleset.compositeRules[virtualPropertyName] = compositeRule;
            return _this;
        };
        this.withMessage = function (messageOverride) {
            _this.verifyExistingProperty();
            _this.currentRule.messageOverride = messageOverride;
            return _this;
        };
        this.appliesIf = function (appliesFunction) {
            _this.verifyExistingProperty();
            _this.currentRule.appliesIf = appliesFunction;
            return _this;
        };
        this.addRuleForEach = function (rule, ruleOptions) {
            _this.verifyRuleNameIsValid(rule);
            _this.verifyExistingProperty();
            var ruleLink = new rule_link_1.RuleLink(rule, ruleOptions);
            _this.currentRule = ruleLink;
            _this.internalRuleset.addRule(_this.currentProperty, new for_each_rule_1.ForEachRule(ruleLink));
            return _this;
        };
        this.addRuleset = function (ruleset) {
            _this.verifyExistingProperty();
            _this.internalRuleset.addRuleset(_this.currentProperty, ruleset);
            return _this;
        };
        this.addRulesetForEach = function (ruleset) {
            _this.verifyExistingProperty();
            _this.internalRuleset.addRuleset(_this.currentProperty, new for_each_rule_1.ForEachRule(ruleset));
            return _this;
        };
        this.build = function () {
            return _this.internalRuleset;
        };
    }
    RulesetBuilder.prototype.extractPropertyName = function (predicate) {
        var regex = /.*\.([\w]*);/;
        var predicateString = predicate.toString();
        return regex.exec(predicateString)[1];
    };
    return RulesetBuilder;
}());
exports.RulesetBuilder = RulesetBuilder;
