"use strict";
var model_watcher_1 = require("../watcher/model-watcher");
var model_resolver_1 = require("../resolvers/model-resolver");
var DefaultValidationSettings = (function () {
    function DefaultValidationSettings(propertyResolver) {
        this.propertyResolver = propertyResolver;
    }
    DefaultValidationSettings.prototype.createModelWatcher = function (args) { return new model_watcher_1.ModelWatcher(this.propertyResolver); };
    DefaultValidationSettings.prototype.createModelResolver = function (args) { return new model_resolver_1.ModelResolver(this.propertyResolver, args); };
    DefaultValidationSettings.prototype.createPropertyResolver = function (args) { return this.propertyResolver; };
    return DefaultValidationSettings;
}());
exports.DefaultValidationSettings = DefaultValidationSettings;
