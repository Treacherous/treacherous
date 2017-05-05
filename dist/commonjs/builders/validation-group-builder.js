"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validation_group_1 = require("../validation-groups/validation-group");
var reactive_validation_group_builder_1 = require("./reactive-validation-group-builder");
var model_resolver_factory_1 = require("../factories/model-resolver-factory");
var ValidationGroupBuilder = (function () {
    function ValidationGroupBuilder(fieldErrorProcessor, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.create = function () {
            _this.modelResolverFactory = new model_resolver_factory_1.ModelResolverFactory();
            _this.validateOnStart = false;
            return _this;
        };
        this.asReactiveGroup = function () {
            var reactiveBuilder = new reactive_validation_group_builder_1.ReactiveValidationGroupBuilder(_this.fieldErrorProcessor, _this.ruleResolver)
                .create()
                .withModelResolverFactory(_this.modelResolverFactory);
            return reactiveBuilder;
        };
        this.withModelResolverFactory = function (modelResolverFactory) {
            _this.modelResolverFactory = modelResolverFactory;
            return _this;
        };
        this.andValidateOnStart = function () {
            _this.validateOnStart = true;
            return _this;
        };
        this.build = function (model, ruleset) {
            var validationGroup = new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, _this.modelResolverFactory, model, ruleset);
            if (_this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
    return ValidationGroupBuilder;
}());
exports.ValidationGroupBuilder = ValidationGroupBuilder;
