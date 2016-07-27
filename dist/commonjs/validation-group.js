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
var model_resolver_1 = require("./model-resolver");
var validation_settings_1 = require("./validation-settings");
// TODO: This class is WAY to long, needs refactoring
var ValidationGroup = (function () {
    function ValidationGroup(fieldErrorProcessor, ruleResolver, ruleset, model, settingOverrides, refreshRate) {
        var _this = this;
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.ruleset = ruleset;
        this.settingOverrides = settingOverrides;
        this.refreshRate = refreshRate;
        this.propertyErrors = {};
        this.waiting = [];
        this.OnCompletion = function () {
            return new Promise(function (r) { return _this.validationCounter ? _this.waiting.push(function () { return r('All Resolved'); }) : r('Nothing queued'); });
        };
        this.CountedPromise = function (p) {
            if (!p) {
                return Promise.resolve(undefined);
            }
            if (!p.then) {
                throw new Error("Non-Promise pass in: " + p);
            }
            _this.incCounter();
            return p.then(function (r) { _this.decCounter(); return r; }, function (c) { _this.decCounter(); throw c; });
        };
        this.decCounter = function () {
            _this.validationCounter--;
            if (!_this.validationCounter) {
                while (_this.waiting.length)
                    _this.waiting.shift()();
            }
        };
        this.incCounter = function () { _this.validationCounter++; };
        this.onModelChanged = function (eventArgs) {
            _this.startValidateProperty(eventArgs.propertyPath);
        };
        // End of the property deep-dive for launching Promises against properties
        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) {
            return _this.CountedPromise(_this.fieldErrorProcessor.checkFieldForErrors(_this.modelResolver, propertyName, propertyRules))
                .then(function (v) {
                var hadErrors = _this.hasErrors();
                if (!v) {
                    if (_this.propertyErrors[propertyName]) {
                        delete _this.propertyErrors[propertyName];
                        var eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, true);
                        _this.propertyStateChangedEvent.publish(eventArgs);
                        if (hadErrors) {
                            _this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(true));
                        }
                    }
                    return;
                }
                var previousError = _this.propertyErrors[propertyName];
                _this.propertyErrors[propertyName] = v;
                if (v != previousError) {
                    var eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, false, v);
                    _this.propertyStateChangedEvent.publish(eventArgs);
                    if (!hadErrors) {
                        _this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(false));
                    }
                }
            })
                .then(_this.OnCompletion);
        };
        // Calls validatePropertyWithRules
        this.validatePropertyWithRuleSet = function (propertyName, ruleset) {
            var transformedPropertyName;
            for (var childPropertyName in ruleset.rules) {
                transformedPropertyName = propertyName + "." + childPropertyName;
                _this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
            }
        };
        // Starts CountedPromises for every rule in the set passed in. Does not wait for completion.
        this.validatePropertyWithRules = function (propertyName, rules) {
            var ruleLinks = [];
            var ruleSets = [];
            var currentValue;
            try {
                currentValue = _this.modelResolver.get(propertyName);
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
                _this.CountedPromise(_this.validatePropertyWithRuleSet(propertyName, ruleSet));
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
        this.hasErrors = function () {
            return Object.keys(_this.propertyErrors).length > 0;
        };
        this.changeValidationTarget = function (model) {
            _this.modelResolver.model = model;
            if (_this.modelWatcher)
                _this.modelWatcher.changeWatcherTarget(_this.modelResolver.model);
        };
        this.validateProperty = function (propertyname) {
            return _this.startValidateProperty(propertyname)
                .OnCompletion()
                .then(function () { return !_this.getPropertyError(propertyname); });
        };
        this.validate = function () {
            return _this.startValidateModel()
                .OnCompletion()
                .then(function () { return !_this.hasErrors(); });
        };
        this.getModelErrors = function () {
            return _this.startValidateModel()
                .OnCompletion()
                .then(function () {
                return _this.propertyErrors;
            });
        };
        this.getPropertyError = function (propertyRoute) {
            return _this
                .OnCompletion()
                .then(function () { return _this.propertyErrors[propertyRoute]; });
        };
        this.release = function () {
            if (_this.modelWatcher)
                _this.modelWatcher.stopWatching();
        };
        this.settings = Object.assign({}, validation_settings_1.validationSettingsDefaults, settingOverrides);
        this.validationCounter = 0;
        this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelResolver = new model_resolver_1.ModelResolver(this.settings.createPropertyResolver(), model || {});
        if (this.settings.useModelWatcher && this.settings.createModelWatcher) {
            this.modelWatcher = this.settings.createModelWatcher();
            this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
            this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
        }
    }
    Object.defineProperty(ValidationGroup.prototype, "ValidationState", {
        get: function () {
            return !this.validationCounter ? (!this.propertyErrors == {} ? 'valid' : 'invalid') : 'calculating';
        },
        enumerable: true,
        configurable: true
    });
    ValidationGroup.prototype.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    ValidationGroup.prototype.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    return ValidationGroup;
}());
exports.ValidationGroup = ValidationGroup;
