"use strict";
var reactive_validation_group_1 = require("../validation-groups/reactive-validation-group");
var model_watcher_factory_1 = require("../factories/model-watcher-factory");
var model_resolver_factory_1 = require("../factories/model-resolver-factory");
var ReactiveValidationGroupBuilder = (function () {
    function ReactiveValidationGroupBuilder(fieldErrorProcessor, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.create = function () {
            _this.refreshRate = 500;
            _this.validateOnStart = false;
            _this.modelWatcherFactory = new model_watcher_factory_1.ModelWatcherFactory();
            _this.modelResolverFactory = new model_resolver_factory_1.ModelResolverFactory();
            return _this;
        };
        this.withRefreshRate = function (refreshRate) {
            _this.refreshRate = refreshRate;
            return _this;
        };
        this.withModelResolverFactory = function (modelResolverFactory) {
            _this.modelResolverFactory = modelResolverFactory;
            return _this;
        };
        this.withModelWatcherFactory = function (modelWatcherFactory) {
            _this.modelWatcherFactory = modelWatcherFactory;
            return _this;
        };
        this.andValidateOnStart = function () {
            _this.validateOnStart = true;
            return _this;
        };
        this.build = function (model, ruleset) {
            var validationGroup = new reactive_validation_group_1.ReactiveValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, _this.modelResolverFactory, _this.modelWatcherFactory, model, ruleset, _this.refreshRate);
            if (_this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
    return ReactiveValidationGroupBuilder;
}());
exports.ReactiveValidationGroupBuilder = ReactiveValidationGroupBuilder;
