define(["require", "exports", "../watcher/model-watcher"], function (require, exports, model_watcher_1) {
    "use strict";
    var ModelWatcherFactory = (function () {
        function ModelWatcherFactory() {
            this.createModelWatcher = function () {
                return new model_watcher_1.ModelWatcher();
            };
        }
        return ModelWatcherFactory;
    }());
    exports.ModelWatcherFactory = ModelWatcherFactory;
});
