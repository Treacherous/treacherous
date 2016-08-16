define(["require", "exports", "../rulesets/rule-resolver", "../helpers/type-helper", "../promises/promise-counter"], function (require, exports, rule_resolver_1, type_helper_1, promise_counter_1) {
    "use strict";
    // TODO: This class is WAY to long, needs refactoring
    var ValidationGroup = (function () {
        function ValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset) {
            var _this = this;
            if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
            this.fieldErrorProcessor = fieldErrorProcessor;
            this.ruleResolver = ruleResolver;
            this.modelResolverFactory = modelResolverFactory;
            this.ruleset = ruleset;
            this.propertyErrors = {};
            this.validatePropertyWithRuleLinks = function (propertyRoute, propertyRules) {
                return _this.promiseCounter.countPromise(_this.fieldErrorProcessor.checkFieldForErrors(_this.modelResolver, propertyRoute, propertyRules))
                    .then(function (possibleErrors) {
                    if (!possibleErrors) {
                        if (_this.propertyErrors[propertyRoute]) {
                            delete _this.propertyErrors[propertyRoute];
                        }
                        return;
                    }
                    _this.propertyErrors[propertyRoute] = possibleErrors;
                })
                    .then(_this.promiseCounter.waitForCompletion);
            };
            this.validatePropertyWithRuleSet = function (propertyRoute, ruleset) {
                var transformedPropertyName;
                for (var childPropertyName in ruleset.rules) {
                    transformedPropertyName = propertyRoute + "." + childPropertyName;
                    _this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
                }
            };
            this.validatePropertyWithRules = function (propertyRoute, rules) {
                var ruleLinks = [];
                var ruleSets = [];
                var currentValue;
                try {
                    currentValue = _this.modelResolver.resolve(propertyRoute);
                }
                catch (ex) {
                    console.warn("Failed to resolve property " + propertyRoute + " during validation. Does it exist in your model?");
                    throw (ex);
                }
                var routeEachRule = function (ruleLinkOrSet) {
                    if (_this.isForEach(ruleLinkOrSet)) {
                        var isCurrentlyAnArray = type_helper_1.TypeHelper.isArrayType(currentValue);
                        if (isCurrentlyAnArray) {
                            currentValue.forEach(function (element, index) {
                                var childPropertyName = propertyRoute + "[" + index + "]";
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
                _this.validatePropertyWithRuleLinks(propertyRoute, ruleLinks);
                ruleSets.forEach(function (ruleSet) {
                    _this.validatePropertyWithRuleSet(propertyRoute, ruleSet);
                });
                return _this;
            };
            this.startValidateProperty = function (propertyRoute) {
                var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyRoute, _this.ruleset);
                if (!rulesForProperty) {
                    return _this;
                }
                return _this.validatePropertyWithRules(propertyRoute, rulesForProperty);
            };
            this.startValidateModel = function () {
                for (var parameterName in _this.ruleset.rules) {
                    _this.startValidateProperty(parameterName);
                }
                return _this;
            };
            this.changeValidationTarget = function (model) {
                _this.modelResolver = _this.modelResolverFactory.createModelResolver(model);
            };
            this.validateProperty = function (propertyRoute) {
                return _this.startValidateProperty(propertyRoute)
                    .promiseCounter.waitForCompletion()
                    .then(function () { return !_this.propertyErrors[propertyRoute]; });
            };
            this.validate = function () {
                return _this.startValidateModel()
                    .promiseCounter.waitForCompletion()
                    .then(function () { return !_this.hasErrors(); });
            };
            this.getModelErrors = function (revalidate) {
                if (revalidate === void 0) { revalidate = false; }
                var promise = revalidate ?
                    _this.startValidateModel().promiseCounter.waitForCompletion() :
                    _this.promiseCounter.waitForCompletion();
                return promise.then(function () { return _this.propertyErrors; });
            };
            this.getPropertyError = function (propertyRoute, revalidate) {
                if (revalidate === void 0) { revalidate = false; }
                var promise = revalidate ?
                    _this.startValidateProperty(propertyRoute).promiseCounter.waitForCompletion() :
                    _this.promiseCounter.waitForCompletion();
                return promise.then(function () { return _this.propertyErrors[propertyRoute]; });
            };
            this.release = function () { };
            this.promiseCounter = new promise_counter_1.PromiseCounter();
            this.modelResolver = this.modelResolverFactory.createModelResolver(model);
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
});
