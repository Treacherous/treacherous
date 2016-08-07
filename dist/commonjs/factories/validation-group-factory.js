"use strict";
var reactive_validation_group_1 = require("../reactive-validation-group");
var ValidationGroupFactory = (function () {
    function ValidationGroupFactory(fieldErrorProcessor, ruleResolver, defaultSettings) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.defaultSettings = defaultSettings;
        this.createValidationGroup = function (model, ruleset, settings) {
            return new reactive_validation_group_1.ReactiveValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, ruleset, model, settings || _this.defaultSettings);
        };
    }
    return ValidationGroupFactory;
}());
exports.ValidationGroupFactory = ValidationGroupFactory;
