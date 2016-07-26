"use strict";
var validation_group_1 = require("../validation-group");
var validation_settings_1 = require("../validation-settings");
var ValidationGroupFactory = (function () {
    function ValidationGroupFactory(fieldErrorProcessor, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.createValidationGroup = function (model, ruleset, options) {
            var _settings = Object.assign(validation_settings_1.validationSettingsDefaults, options || {});
            var modelWatcher = _settings.createModelWatcher();
            var propertyResolver = _settings.createPropertyResolver();
            return new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, ruleset, model, _settings);
        };
    }
    return ValidationGroupFactory;
}());
exports.ValidationGroupFactory = ValidationGroupFactory;
