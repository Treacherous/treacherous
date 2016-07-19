var model_watcher_1 = require("../watcher/model-watcher");
var ModelWatcherFactory = (function () {
    function ModelWatcherFactory(propertyResolver) {
        this.propertyResolver = propertyResolver;
    }
    ModelWatcherFactory.prototype.createModelWatcher = function () {
        return new model_watcher_1.ModelWatcher(this.propertyResolver);
    };
    return ModelWatcherFactory;
})();
exports.ModelWatcherFactory = ModelWatcherFactory;
