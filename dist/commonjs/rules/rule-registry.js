"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuleRegistry = (function () {
    function RuleRegistry() {
        var _this = this;
        this.rules = {};
        this.registerRule = function (validationRule) {
            _this.rules[validationRule.ruleName] = validationRule;
        };
        this.unregisterRule = function (validationRule) {
            delete _this.rules[validationRule.ruleName];
        };
        this.getRuleNamed = function (ruleName) {
            return _this.rules[ruleName] || null;
        };
        this.hasRuleNamed = function (ruleName) {
            return _this.getRuleNamed(ruleName) != null;
        };
    }
    return RuleRegistry;
}());
exports.RuleRegistry = RuleRegistry;
