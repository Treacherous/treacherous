"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var event_js_1 = require("event-js");
var property_state_changed_event_1 = require("../events/property-state-changed-event");
var model_state_changed_event_1 = require("../events/model-state-changed-event");
var rule_resolver_1 = require("../rulesets/rule-resolver");
var validation_group_1 = require("./validation-group");
var ReactiveValidationGroup = (function (_super) {
    __extends(ReactiveValidationGroup, _super);
    function ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, modelWatcherFactory, model, ruleset, refreshRate) {
        var _this = this;
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        _super.call(this, fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset);
        this.modelWatcherFactory = modelWatcherFactory;
        this.refreshRate = refreshRate;
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
        this.release = function () {
            if (_this.modelWatcher)
                _this.modelWatcher.stopWatching();
        };
        this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelStateChangedEvent = new event_js_1.EventHandler(this);
        this.modelWatcher = this.modelWatcherFactory.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }
    return ReactiveValidationGroup;
}(validation_group_1.ValidationGroup));
exports.ReactiveValidationGroup = ReactiveValidationGroup;
