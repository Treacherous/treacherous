"use strict";
var validation_group_1 = require("../validation-group");
var ValidationGroupFactory = (function () {
    function ValidationGroupFactory(fieldErrorProcessor, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.createValidationGroup = function (model, ruleset, options) {
            return new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.ruleResolver, ruleset, model, options);
        };
    }
    return ValidationGroupFactory;
}());
exports.ValidationGroupFactory = ValidationGroupFactory;
