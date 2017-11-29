"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RuleLink = /** @class */ (function () {
    function RuleLink(ruleName, ruleOptions) {
        this.ruleName = ruleName;
        this.ruleOptions = ruleOptions;
        this.appliesIf = true;
    }
    return RuleLink;
}());
exports.RuleLink = RuleLink;
