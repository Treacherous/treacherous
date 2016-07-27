"use strict";
var property_resolver_1 = require("property-resolver");
var model_watcher_1 = require("./watcher/model-watcher");
var ValidationSettings = (function () {
    function ValidationSettings(params) {
        this.useModelWatcher = true;
        Object.assign(this, params);
        this.createPropertyResolver = this.createPropertyResolver || (function () { return new property_resolver_1.PropertyResolver(); });
        this.createModelWatcher = this.createModelWatcher || (function () { return new model_watcher_1.ModelWatcher(); });
    }
    return ValidationSettings;
}());
exports.ValidationSettings = ValidationSettings;
exports.validationSettingsDefaults = new ValidationSettings();
