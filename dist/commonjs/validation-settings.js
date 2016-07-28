"use strict";
var settings_builder_1 = require("./settings-builder");
var ValidationSettings = (function () {
    function ValidationSettings() {
        this.createModelWatcher = null;
        this.createPropertyResolver = null;
    }
    ValidationSettings.prototype.configure = function (fn) {
        var builder = new settings_builder_1.SettingsBuilder(this);
        fn(builder);
        return builder.Settings;
    };
    return ValidationSettings;
}());
exports.ValidationSettings = ValidationSettings;
