(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../watcher/model-watcher"], factory);
    }
})(function (require, exports) {
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
});
