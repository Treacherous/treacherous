define(["require", "exports", "../rulesets/ruleset", "../rulesets/rule-link", "../rulesets/for-each-rule", "../helpers/type-helper"], function (require, exports, ruleset_1, rule_link_1, for_each_rule_1, type_helper_1) {
    "use strict";
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
});
