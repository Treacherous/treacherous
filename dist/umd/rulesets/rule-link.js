(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
});
