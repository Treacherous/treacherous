var validation_group_1 = require("../validation-group");
var ValidationGroupFactory = (function () {
    function ValidationGroupFactory(fieldErrorProcessor, modelWatcher, propertyResolver, ruleResolver) {
        var _this = this;
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.modelWatcher = modelWatcher;
        this.propertyResolver = propertyResolver;
        this.ruleResolver = ruleResolver;
        this.createValidationGroup = function (model, ruleset) {
            return new validation_group_1.ValidationGroup(_this.fieldErrorProcessor, _this.modelWatcher, _this.propertyResolver, _this.ruleResolver, ruleset, model);
        };
    }
    return ValidationGroupFactory;
})();
exports.ValidationGroupFactory = ValidationGroupFactory;
