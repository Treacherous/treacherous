define(["require", "exports", "./field-has-error"], function (require, exports, field_has_error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FieldErrorProcessor = (function () {
        function FieldErrorProcessor(ruleRegistry) {
            this.ruleRegistry = ruleRegistry;
        }
        // Validates a single property against a model
        FieldErrorProcessor.prototype.processRuleLink = function (modelResolver, propertyName, ruleLink) {
            var shouldRuleApply = ruleLink.appliesIf === true
                || ((typeof (ruleLink.appliesIf) === "function")
                    ? (ruleLink.appliesIf)(modelResolver, propertyName, ruleLink.ruleOptions)
                    : false);
            if (!shouldRuleApply) {
                return Promise.resolve();
            }
            var validator = this.ruleRegistry.getRuleNamed(ruleLink.ruleName);
            var options = (typeof ruleLink.ruleOptions == "function") ? ruleLink.ruleOptions() : ruleLink.ruleOptions;
            return validator
                .validate(modelResolver, propertyName, options)
                .then(function (isValid) {
                if (!isValid) {
                    var error;
                    if (ruleLink.messageOverride) {
                        if (typeof (ruleLink.messageOverride) === "function") {
                            error = (ruleLink.messageOverride)(modelResolver, propertyName, ruleLink.ruleOptions);
                        }
                        else {
                            error = ruleLink.messageOverride;
                        }
                    }
                    else {
                        error = validator.getMessage(modelResolver, propertyName, ruleLink.ruleOptions);
                    }
                    throw new field_has_error_1.FieldHasError(error);
                }
                return Promise.resolve();
            });
        };
        // Loops through each rule on a property, adds it to a chain, then calls Promise.all
        // Probably not correct, as they won't fire sequentially? Promises need to be chained
        FieldErrorProcessor.prototype.checkFieldForErrors = function (modelResolver, propertyName, rules) {
            var _this = this;
            var ruleCheck = function (ruleLinkOrSet) {
                return _this.processRuleLink(modelResolver, propertyName, ruleLinkOrSet);
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
});
