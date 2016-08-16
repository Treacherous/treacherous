"use strict";
var RuleLink = (function () {
    function RuleLink(ruleName, ruleOptions) {
        this.ruleName = ruleName;
        this.ruleOptions = ruleOptions;
        this.appliesIf = true;
    }
    return RuleLink;
}());
exports.RuleLink = RuleLink;
