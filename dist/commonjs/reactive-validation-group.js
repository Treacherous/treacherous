/*
 validate() fires validateModel() then waits to ensure every rule has been resolved and returns Promise of true/false
 validateProperty(prop) calls the rules for a single Property, waits to ensure any pending rules have been resolved, and returns Promise of true/false

 getModelErrors() waits to ensure any pending rules have been resolved and returns Promise of all errors
 getPropertyError() waits to ensure any pending rules have been resolved and returns single error list for property

 startValidateModel() starts a set of Promises to validate everything in the RuleSet. Returns validationGroup without waiting
 startValidateProperty(prop) starts a set of Promises to validate a single Property. Returns validationGroup without waiting
 */
"use strict";
var event_js_1 = require("event-js");
var property_state_changed_event_1 = require("./events/property-state-changed-event");
var model_state_changed_event_1 = require("./events/model-state-changed-event");
var rule_resolver_1 = require("./rulesets/rule-resolver");
var type_helper_1 = require("./helpers/type-helper");
var promise_counter_1 = require("./promises/promise-counter");
// TODO: This class is WAY to long, needs refactoring
var ReactiveValidationGroup = (function () {
    function ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, ruleset, model, settings, refreshRate) {
        var _this = this;
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.ruleset = ruleset;
        this.settings = settings;
        this.refreshRate = refreshRate;
        this.propertyErrors = {};
        this.onModelChanged = function (eventArgs) {
            _this.startValidateProperty(eventArgs.propertyPath);
        };
        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) {
            return _this.promiseCounter.countPromise(_this.fieldErrorProcessor.checkFieldForErrors(_this.modelResolver, propertyName, propertyRules))
                .then(function (possibleErrors) {
                var hadErrors = _this.hasErrors();
                if (!possibleErrors) {
                    if (_this.propertyErrors[propertyName]) {
                        delete _this.propertyErrors[propertyName];
                        var eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, true);
                        _this.propertyStateChangedEvent.publish(eventArgs);
                        var stillHasErrors = hadErrors && _this.hasErrors();
                        if (!stillHasErrors) {
                            _this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(true));
                        }
                    }
                    return;
                }
                var previousError = _this.propertyErrors[propertyName];
                _this.propertyErrors[propertyName] = possibleErrors;
                if (possibleErrors != previousError) {
                    var eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, false, possibleErrors);
                    _this.propertyStateChangedEvent.publish(eventArgs);
                    if (!hadErrors) {
                        _this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(false));
                    }
                }
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
                _this.validatePropertyWithRuleSet(propertyName, ruleSet);
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
            _this.modelWatcher.changeWatcherTarget(_this.modelResolver.model);
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
        this.release = function () {
            if (_this.modelWatcher)
                _this.modelWatcher.stopWatching();
        };
        this.promiseCounter = new promise_counter_1.PromiseCounter();
        this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelResolver = this.settings.createModelResolver(model);
        this.modelWatcher = this.settings.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }
    ReactiveValidationGroup.prototype.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    ReactiveValidationGroup.prototype.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    ReactiveValidationGroup.prototype.hasErrors = function () {
        return (Object.keys(this.propertyErrors).length > 0);
    };
    return ReactiveValidationGroup;
}());
exports.ReactiveValidationGroup = ReactiveValidationGroup;
