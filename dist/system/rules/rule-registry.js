System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RuleRegistry;
    return {
        setters: [],
        execute: function () {
            RuleRegistry = (function () {
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
            exports_1("RuleRegistry", RuleRegistry);
        }
    };
});
