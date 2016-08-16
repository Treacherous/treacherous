System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ruleset;
    return {
        setters:[],
        execute: function() {
            Ruleset = (function () {
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
            exports_1("Ruleset", Ruleset);
        }
    }
});
