"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_watcher_1 = require("../watcher/model-watcher");
var ModelWatcherFactory = /** @class */ (function () {
    function ModelWatcherFactory() {
        this.createModelWatcher = function () {
            return new model_watcher_1.ModelWatcher();
        };
    }
    return ModelWatcherFactory;
}());
exports.ModelWatcherFactory = ModelWatcherFactory;
