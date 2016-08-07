"use strict";
var reactive_validation_group_1 = require("../validation-groups/reactive-validation-group");
var ReactiveValidationGroupBuilder = (function () {
    function ReactiveValidationGroupBuilder(fieldErrorProcessor, ruleResolver, defaultValidationSettings) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.defaultValidationSettings = defaultValidationSettings;
        this.create = function () {
            _this.refreshRate = 500;
            _this.validateOnStart = false;
            _this.validationSettings = _this.defaultValidationSettings;
            return _this;
        };
        this.withRefreshRate = function (refreshRate) {
            _this.refreshRate = refreshRate;
            return _this;
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
            var validationGroup = new reactive_validation_group_1.ReactiveValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, _this.validationSettings, model, ruleset, _this.refreshRate);
            if (_this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
    return ReactiveValidationGroupBuilder;
}());
exports.ReactiveValidationGroupBuilder = ReactiveValidationGroupBuilder;
