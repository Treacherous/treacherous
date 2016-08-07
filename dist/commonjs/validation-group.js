"use strict";
var rule_resolver_1 = require("./rulesets/rule-resolver");
var type_helper_1 = require("./helpers/type-helper");
var promise_counter_1 = require("./promises/promise-counter");
// TODO: This class is WAY to long, needs refactoring
var ValidationGroup = (function () {
    function ValidationGroup(fieldErrorProcessor, ruleResolver, ruleset, model, settings) {
        var _this = this;
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.ruleset = ruleset;
        this.settings = settings;
        this.propertyErrors = {};
        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) {
            return _this.promiseCounter.countPromise(_this.fieldErrorProcessor.checkFieldForErrors(_this.modelResolver, propertyName, propertyRules))
                .then(function (possibleErrors) {
                if (!possibleErrors) {
                    if (_this.propertyErrors[propertyName]) {
                        delete _this.propertyErrors[propertyName];
                    }
                    return;
                }
                _this.propertyErrors[propertyName] = possibleErrors;
            })
                .then(_this.promiseCounter.waitForCompletion);
        };
        this.validatePropertyWithRuleSet = function (propertyName, ruleset) {
            var transformedPropertyName;
            for (var childPropertyName in ruleset.rules) {
                transformedPropertyName = propertyName + "." + childPropertyName;
                _this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            }
        };
        this.validatePropertyWithRules = function (propertyName, rules) {
            var ruleLinks = [];
            var ruleSets = [];
            var currentValue;
            try {
                currentValue = _this.modelResolver.resolve(propertyName);
            }
            catch (ex) {
                console.warn("Failed to resolve property " + propertyName + " during validation. Does it exist in your model?");
                throw (ex);
            }
            var routeEachRule = function (ruleLinkOrSet) {
                if (_this.isForEach(ruleLinkOrSet)) {
                    var isCurrentlyAnArray = type_helper_1.TypeHelper.isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        currentValue.forEach(function (element, index) {
                            var childPropertyName = propertyName + "[" + index + "]";
                            _this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                        });
                    }
                    else {
                        if (_this.isRuleset(ruleLinkOrSet.internalRule)) {
                            ruleSets.push(ruleLinkOrSet.internalRule);
                        }
                        else {
                            ruleLinks.push(ruleLinkOrSet.internalRule);
                        }
                    }
                }
                else if (_this.isRuleset(ruleLinkOrSet)) {
                    ruleSets.push(ruleLinkOrSet);
                }
                else {
                    ruleLinks.push(ruleLinkOrSet);
                }
            };
            rules.forEach(routeEachRule);
            _this.validatePropertyWithRuleLinks(propertyName, ruleLinks);
            ruleSets.forEach(function (ruleSet) {
                _this.promiseCounter.countPromise(_this.validatePropertyWithRuleSet(propertyName, ruleSet));
            });
            return _this;
        };
        this.startValidateProperty = function (propertyName) {
            var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyName, _this.ruleset);
            if (!rulesForProperty) {
                return _this;
            }
            return _this.validatePropertyWithRules(propertyName, rulesForProperty);
        };
        this.startValidateModel = function () {
            for (var parameterName in _this.ruleset.rules) {
                _this.startValidateProperty(parameterName);
            }
            return _this;
        };
        this.changeValidationTarget = function (model) {
            _this.modelResolver = _this.settings.createModelResolver(model);
        };
        this.validateProperty = function (propertyname) {
            return _this.startValidateProperty(propertyname)
                .promiseCounter.waitForCompletion()
                .then(function () { return !_this.getPropertyError(propertyname); });
        };
        this.validate = function () {
            return _this.startValidateModel()
                .promiseCounter.waitForCompletion()
                .then(function () { return !_this.hasErrors(); });
        };
        this.getModelErrors = function () {
            return _this.startValidateModel()
                .promiseCounter.waitForCompletion()
                .then(function () {
                return _this.propertyErrors;
            });
        };
        this.getPropertyError = function (propertyRoute) {
            return _this
                .promiseCounter.waitForCompletion()
                .then(function () { return _this.propertyErrors[propertyRoute]; });
        };
        this.release = function () { };
        this.promiseCounter = new promise_counter_1.PromiseCounter();
        this.modelResolver = this.settings.createModelResolver(model);
    }
    ValidationGroup.prototype.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    ValidationGroup.prototype.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    ValidationGroup.prototype.hasErrors = function () {
        return (Object.keys(this.propertyErrors).length > 0);
    };
    return ValidationGroup;
}());
exports.ValidationGroup = ValidationGroup;
