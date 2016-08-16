(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ModelResolver = (function () {
        function ModelResolver(propertyResolver, model) {
            this.propertyResolver = propertyResolver;
            this.model = model;
        }
        ModelResolver.prototype.resolve = function (propertyName) {
            return this.propertyResolver.resolveProperty(this.model, propertyName);
        };
        ;
        return ModelResolver;
    }());
    exports.ModelResolver = ModelResolver;
});
