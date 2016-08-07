"use strict";
var model_watcher_1 = require("../watcher/model-watcher");
var ModelWatcherFactory = (function () {
    function ModelWatcherFactory() {
        this.createModelWatcher = function () {
            return new model_watcher_1.ModelWatcher();
        };
    }
    return ModelWatcherFactory;
}());
exports.ModelWatcherFactory = ModelWatcherFactory;
