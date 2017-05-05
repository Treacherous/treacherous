define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RuleLink = (function () {
        function RuleLink(ruleName, ruleOptions) {
            this.ruleName = ruleName;
            this.ruleOptions = ruleOptions;
            this.appliesIf = true;
        }
        return RuleLink;
    }());
    exports.RuleLink = RuleLink;
});
