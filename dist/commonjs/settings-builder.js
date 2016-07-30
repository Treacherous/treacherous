"use strict";
var validation_settings_1 = require("./validation-settings");
var SettingsBuilder = (function () {
    function SettingsBuilder(settings) {
        this.Settings = new validation_settings_1.ValidationSettings(); // We have to clone these manually to avoid Object.assign (ES6)
        this.Settings.createModelWatcher = settings.createModelWatcher;
        this.Settings.createPropertyResolver = settings.createPropertyResolver;
    }
    SettingsBuilder.prototype.setModelWatcherFactory = function (value) {
        this.Settings.createModelWatcher = value;
        return this;
    };
    SettingsBuilder.prototype.setPropertyResolverFactory = function (value) {
        this.Settings.createPropertyResolver = value;
        return this;
    };
    return SettingsBuilder;
}());
exports.SettingsBuilder = SettingsBuilder;
