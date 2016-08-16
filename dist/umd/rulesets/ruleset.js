(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Ruleset = (function () {
        function Ruleset() {
            var _this = this;
            this.rules = {};
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
            this.getRulesForProperty = function (property) { return _this.rules[property]; };
        }
        return Ruleset;
    }());
    exports.Ruleset = Ruleset;
});
