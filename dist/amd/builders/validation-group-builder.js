define(["require", "exports", "../validation-groups/validation-group", "./reactive-validation-group-builder", "../factories/model-resolver-factory"], function (require, exports, validation_group_1, reactive_validation_group_builder_1, model_resolver_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
