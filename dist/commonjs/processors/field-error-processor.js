"use strict";
var field_has_error_1 = require("./field-has-error");
var FieldErrorProcessor = (function () {
    function FieldErrorProcessor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
    }
    // Validates a single property against a model
    FieldErrorProcessor.prototype.processRuleLink = function (mr, propname, ruleLink) {
        var shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof (ruleLink.appliesIf) === "function")
                ? (ruleLink.appliesIf)(mr, propname, ruleLink.ruleOptions)
                : false);
        if (!shouldRuleApply) {
            return Promise.resolve();
        }
        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
        var options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
        return validator
            .validate(mr, propname, options)
            .then(function (isValid) {
            if (!isValid) {
                var error;
                if (ruleLink.messageOverride) {
                    if (typeof (ruleLink.messageOverride) === "function") {
                        error = (ruleLink.messageOverride)(mr, propname, ruleLink.ruleOptions);
                    }
                    else {
                        error = ruleLink.messageOverride;
                    }
                }
                else {
                    error = validator.getMessage(mr, propname, ruleLink.ruleOptions);
                }
                throw new field_has_error_1.FieldHasError(error);
            }
            return Promise.resolve();
        });
    };
    // Loops through each rule on a property, adds it to a chain, then calls Promise.all
    // Probably not correct, as they won't fire sequentially? Promises need to be chained
    FieldErrorProcessor.prototype.checkFieldForErrors = function (mr, propname, rules) {
        var _this = this;
        var ruleCheck = function (ruleLinkOrSet) {
            return _this.processRuleLink(mr, propname, ruleLinkOrSet);
        };
        var checkEachRule = function (rules) {
            var promises = [];
            rules.forEach(function (rule) {
                promises.push(ruleCheck(rule));
            });
            return Promise.all(promises);
        };
        return Promise.resolve(rules)
            .then(checkEachRule)
            .then(function () { return null; })
            .catch(function (validationError) {
            return validationError.message;
        });
    };
    return FieldErrorProcessor;
}());
exports.FieldErrorProcessor = FieldErrorProcessor;
