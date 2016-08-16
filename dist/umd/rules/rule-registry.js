(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
