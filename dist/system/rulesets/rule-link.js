System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RuleLink;
    return {
        setters:[],
        execute: function() {
            RuleLink = (function () {
                function RuleLink(ruleName, ruleOptions) {
                    this.ruleName = ruleName;
                    this.ruleOptions = ruleOptions;
                    this.appliesIf = true;
                }
                return RuleLink;
            }());
            exports_1("RuleLink", RuleLink);
        }
    }
});
