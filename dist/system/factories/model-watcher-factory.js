System.register(["../watcher/model-watcher"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_watcher_1, ModelWatcherFactory;
    return {
        setters: [
            function (model_watcher_1_1) {
                model_watcher_1 = model_watcher_1_1;
            }
        ],
        execute: function () {
            ModelWatcherFactory = (function () {
                function ModelWatcherFactory() {
                    this.createModelWatcher = function () {
                        return new model_watcher_1.ModelWatcher();
                    };
                }
                return ModelWatcherFactory;
            }());
            exports_1("ModelWatcherFactory", ModelWatcherFactory);
        }
    };
});
