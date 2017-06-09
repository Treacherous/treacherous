define(["require", "exports", "tslib", "../rulesets/rule-resolver", "../helpers/type-helper", "../promises/promise-counter", "../events/property-state-changed-event", "../events/model-state-changed-event", "event-js"], function (require, exports, tslib_1, rule_resolver_1, type_helper_1, promise_counter_1, property_state_changed_event_1, model_state_changed_event_1, event_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // TODO: This class could be simplified
    var ValidationGroup = (function () {
        function ValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset) {
            if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
            var _this = this;
            this.fieldErrorProcessor = fieldErrorProcessor;
            this.ruleResolver = ruleResolver;
            this.modelResolverFactory = modelResolverFactory;
            this.ruleset = ruleset;
            this.propertyErrors = {};
            this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var activePromise, possibleErrors, hadErrors, eventArgs, stillHasErrors, previousError, eventArgs;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            activePromise = this.fieldErrorProcessor.checkFieldForErrors(this.modelResolver, propertyName, propertyRules);
                            return [4 /*yield*/, this.promiseCounter.countPromise(activePromise)];
                        case 1:
                            possibleErrors = _a.sent();
                            hadErrors = this.hasErrors();
                            if (!possibleErrors) {
                                if (this.propertyErrors[propertyName]) {
                                    delete this.propertyErrors[propertyName];
                                    eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, true);
                                    this.propertyStateChangedEvent.publish(eventArgs);
                                    stillHasErrors = hadErrors && this.hasErrors();
                                    if (!stillHasErrors) {
                                        this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(true));
                                    }
                                }
                                return [2 /*return*/, this.promiseCounter.waitForCompletion()];
                            }
                            previousError = this.propertyErrors[propertyName];
                            this.propertyErrors[propertyName] = possibleErrors;
                            if (possibleErrors != previousError) {
                                eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, false, possibleErrors);
                                this.propertyStateChangedEvent.publish(eventArgs);
                                if (!hadErrors) {
                                    this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(false));
                                }
                            }
                            return [2 /*return*/, this.promiseCounter.waitForCompletion()];
                    }
                });
            }); };
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
            };
            this.startValidateProperty = function (propertyRoute) {
                var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyRoute, _this.ruleset);
                if (!rulesForProperty) {
                    return;
                }
                return _this.validatePropertyWithRules(propertyRoute, rulesForProperty);
            };
            this.startValidateModel = function () {
                for (var parameterName in _this.ruleset.rules) {
                    _this.startValidateProperty(parameterName);
                }
            };
            this.changeValidationTarget = function (model) {
                _this.modelResolver = _this.modelResolverFactory.createModelResolver(model);
            };
            this.validateProperty = function (propertyRoute) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.startValidateProperty(propertyRoute)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, !this.propertyErrors[propertyRoute]];
                    }
                });
            }); };
            this.validate = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.startValidateModel()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, !this.hasErrors()];
                    }
                });
            }); };
            this.getModelErrors = function (revalidate) {
                if (revalidate === void 0) { revalidate = false; }
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!revalidate) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.startValidateModel()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, this.propertyErrors];
                        }
                    });
                });
            };
            this.getPropertyError = function (propertyRoute, revalidate) {
                if (revalidate === void 0) { revalidate = false; }
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!revalidate) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.startValidateProperty(propertyRoute)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [4 /*yield*/, this.promiseCounter.waitForCompletion()];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, this.propertyErrors[propertyRoute]];
                        }
                    });
                });
            };
            this.release = function () { };
            this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
            this.modelStateChangedEvent = new event_js_1.EventHandler(this);
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
