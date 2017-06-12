define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ruleset = (function () {
        function Ruleset() {
            var _this = this;
            this.rules = {};
            this.propertyDisplayNames = {};
            this.createPropertyEntryIfNeeded = function (property) {
                if (!_this.rules[property]) {
                    _this.rules[property] = [];
                }
            };
            this.addRule = function (property, ruleLink) {
                _this.createPropertyEntryIfNeeded(property);
                _this.rules[property].push(ruleLink);
            };
            this.addRuleset = function (property, ruleset) {
                _this.createPropertyEntryIfNeeded(property);
                _this.rules[property].push(ruleset);
            };
            this.addCompositeRule = function (compositeRule) { _this.compositeRules[compositeRule.propertyName] = compositeRule; };
            this.addPropertyDisplayName = function (propertyName, displayName) { return _this.propertyDisplayNames[propertyName] = displayName; };
            this.getRulesForProperty = function (property) { return _this.rules[property]; };
            this.getCompositeRulesRulesForProperty = function (propertyName) { return _this.compositeRules[propertyName]; };
            this.getPropertyDisplayName = function (propertyName) { return _this.propertyDisplayNames[propertyName]; };
        }
        return Ruleset;
    }());
    exports.Ruleset = Ruleset;
});
