var property_resolver_1 = require("property-resolver");
var event_js_1 = require("event-js");
var property_state_changed_event_1 = require("./events/property-state-changed-event");
var model_state_changed_event_1 = require("./events/model-state-changed-event");
var rule_resolver_1 = require("./rulesets/rule-resolver");
var type_helper_1 = require("./helpers/type-helper");
// TODO: This class is WAY to long, needs refactoring
var ValidationGroup = (function () {
    function ValidationGroup(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver, ruleset, model, refreshRate) {
        var _this = this;
        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.modelWatcher = modelWatcher;
        this.propertyResolver = propertyResolver;
        this.ruleResolver = ruleResolver;
        this.ruleset = ruleset;
        this.model = model;
        this.refreshRate = refreshRate;
        this.propertyErrors = {};
        this.countedPromise = function (wrappedPromise) {
            if (!wrappedPromise) {
                return Promise.resolve();
            }
            _this.activeValidationCount++;
            return wrappedPromise.then(function (r) { _this.activeValidationCount--; return r; }, function (e) { _this.activeValidationCount--; throw (e); });
        };
        this.onModelChanged = function (eventArgs) {
            _this.validateProperty(eventArgs.propertyPath);
        };
        this.validatePropertyWithRuleLinks = function (propertyName, propertyRules) {
            var handlePossibleError = function (possibleError) {
                var hadErrors = _this.hasErrors();
                if (!possibleError) {
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
                _this.propertyErrors[propertyName] = possibleError;
                if (possibleError != previousError) {
                    var eventArgs = new property_state_changed_event_1.PropertyStateChangedEvent(propertyName, false, possibleError);
                    _this.propertyStateChangedEvent.publish(eventArgs);
                    if (!hadErrors) {
                        _this.modelStateChangedEvent.publish(new model_state_changed_event_1.ModelStateChangedEvent(false));
                    }
                }
            };
            if (_this.activePromiseChain) {
                _this.activePromiseChain = Promise.resolve(_this.activePromiseChain)
                    .then(function () {
                    var fieldValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
                    var promise = _this.fieldErrorProcessor
                        .checkFieldForErrors(fieldValue, propertyRules)
                        .then(handlePossibleError);
                    return _this.countedPromise(promise);
                });
            }
            else {
                var fieldValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
                _this.activePromiseChain = _this.countedPromise(_this.fieldErrorProcessor
                    .checkFieldForErrors(fieldValue, propertyRules)
                    .then(handlePossibleError));
                return _this.countedPromise(_this.activePromiseChain);
            }
        };
        this.validatePropertyWithRuleSet = function (propertyName, ruleset) {
            var promiseList = [];
            var transformedPropertyName;
            for (var childPropertyName in ruleset.rules) {
                transformedPropertyName = propertyName + "." + childPropertyName;
                var countedPromise = _this.validatePropertyWithRules(transformedPropertyName, ruleset.getRulesForProperty(childPropertyName));
                promiseList.push(countedPromise);
            }
            return Promise.all(promiseList);
        };
        this.validatePropertyWithRules = function (propertyName, rules) {
            var ruleLinks = [];
            var ruleSets = [];
            var validationPromises = [];
            var currentValue;
            try {
                currentValue = _this.propertyResolver.resolveProperty(_this.model, propertyName);
            }
            catch (ex) {
                return Promise.resolve();
            }
            var routeEachRule = function (ruleLinkOrSet) {
                if (_this.isForEach(ruleLinkOrSet)) {
                    var isCurrentlyAnArray = type_helper_1.TypeHelper.isArrayType(currentValue);
                    if (isCurrentlyAnArray) {
                        currentValue.forEach(function (element, index) {
                            var childPropertyName = propertyName + "[" + index + "]";
                            var promise = _this.validatePropertyWithRules(childPropertyName, [ruleLinkOrSet.internalRule]);
                            var countedPromise = _this.countedPromise(promise);
                            validationPromises.push(countedPromise);
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
            var countedPromise = _this.countedPromise(_this.validatePropertyWithRuleLinks(propertyName, ruleLinks));
            validationPromises.push(countedPromise);
            ruleSets.forEach(function (ruleSet) {
                var eachCountedPromise = _this.countedPromise(_this.validatePropertyWithRuleSet(propertyName, ruleSet));
                validationPromises.push(eachCountedPromise);
            });
            return Promise.all(validationPromises);
        };
        this.validateProperty = function (propertyName) {
            var rulesForProperty = _this.ruleResolver.resolvePropertyRules(propertyName, _this.ruleset);
            if (!rulesForProperty) {
                return;
            }
            return _this.validatePropertyWithRules(propertyName, rulesForProperty);
        };
        this.validateModel = function () {
            for (var parameterName in _this.ruleset.rules) {
                _this.validateProperty(parameterName);
            }
        };
        this.hasErrors = function () {
            return Object.keys(_this.propertyErrors).length > 0;
        };
        this.changeValidationTarget = function (model) {
            _this.model = model;
            _this.modelWatcher.changeWatcherTarget(_this.model);
        };
        this.isValid = function () {
            return _this.waitForValidatorsToFinish()
                .then(function () { return !_this.hasErrors(); });
        };
        this.getModelErrors = function () {
            return _this.waitForValidatorsToFinish()
                .then(function () { return _this.propertyErrors; });
        };
        this.getPropertyError = function (propertyRoute) {
            return _this.waitForValidatorsToFinish()
                .then(function () { return _this.propertyErrors[propertyRoute]; });
        };
        this.release = function () {
            _this.modelWatcher.stopWatching();
        };
        this.waitForValidatorsToFinish = function () {
            return new Promise(function (resolve, reject) {
                var interval = setInterval(function () {
                    if (_this.activeValidationCount == 0) {
                        clearInterval(interval);
                        resolve();
                    }
                }, _this.modelWatcher.scanInterval);
            });
        };
        this.activeValidationCount = 0;
        this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
        this.validateModel();
    }
    ValidationGroup.prototype.isRuleset = function (possibleRuleset) {
        return (typeof (possibleRuleset.addRule) == "function");
    };
    ValidationGroup.prototype.isForEach = function (possibleForEach) {
        return possibleForEach.isForEach;
    };
    return ValidationGroup;
})();
exports.ValidationGroup = ValidationGroup;
