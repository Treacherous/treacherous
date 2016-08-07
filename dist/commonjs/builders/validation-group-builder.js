"use strict";
var validation_group_1 = require("../validation-groups/validation-group");
var reactive_validation_group_builder_1 = require("./reactive-validation-group-builder");
var ValidationGroupBuilder = (function () {
    function ValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultValidationSettings) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.defaultValidationSettings = defaultValidationSettings;
        this.create = function () {
            _this.validationSettings = _this.defaultValidationSettings;
            _this.validateOnStart = false;
            return _this;
        };
        this.asReactiveGroup = function () {
            var reactiveBuilder = new reactive_validation_group_builder_1.ReactiveValidationGroupBuilder(_this.fieldErrorProcessor, _this.ruleResolver, _this.defaultValidationSettings)
                .create();
            if (_this.validationSettings != _this.defaultValidationSettings) {
                reactiveBuilder.withValidationSettings(_this.validationSettings);
            }
            return reactiveBuilder;
        };
        this.withValidationSettings = function (validationSettings) {
            _this.validationSettings = validationSettings;
            return _this;
        };
        this.andValidateOnStart = function () {
            _this.validateOnStart = true;
            return _this;
        };
        this.build = function (model, ruleset) {
            var validationGroup = new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, _this.validationSettings, model, ruleset);
            if (_this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
    return ValidationGroupBuilder;
}());
exports.ValidationGroupBuilder = ValidationGroupBuilder;
