"use strict";
var field_has_error_1 = require("./field-has-error");
var model_resolver_1 = require("../model-resolver");
var property_resolver_1 = require("property-resolver");
var FieldErrorProcessor = (function () {
    function FieldErrorProcessor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
    }
    FieldErrorProcessor.prototype.processRuleLink = function (model, propname, ruleLink) {
        var mr = new model_resolver_1.ModelResolver(new property_resolver_1.PropertyResolver(), model);
        var shouldRuleApply = ruleLink.appliesIf === true
            || ((typeof (ruleLink.appliesIf) === "function")
                ? ruleLink.appliesIf(mr, propname, ruleLink.ruleOptions)
                : false);
        if (!shouldRuleApply) {
            return Promise.resolve();
        }
        var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
        var checkIfValid = function (isValid) {
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
        };
        var options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
        return validator
            .validate(mr, propname, options)
            .then(checkIfValid);
    };
    FieldErrorProcessor.prototype.checkFieldForErrors = function (model, propname, rules) {
        var _this = this;
        var ruleCheck = function (ruleLinkOrSet) {
            return _this.processRuleLink(model, propname, ruleLinkOrSet);
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
