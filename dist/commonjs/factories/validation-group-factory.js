"use strict";
var validation_group_1 = require("../validation-group");
var ValidationGroupFactory = (function () {
    function ValidationGroupFactory(fieldErrorProcessor, modelWatcherFactory, propertyResolver, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.modelWatcherFactory = modelWatcherFactory;
        this.propertyResolver = propertyResolver;
        this.ruleResolver = ruleResolver;
        this.createValidationGroup = function (model, ruleset) {
            var modelWatcher = _this.modelWatcherFactory.createModelWatcher();
            return new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, modelWatcher, _this.propertyResolver, _this.ruleResolver, ruleset, model);
        };
    }
    return ValidationGroupFactory;
}());
exports.ValidationGroupFactory = ValidationGroupFactory;
