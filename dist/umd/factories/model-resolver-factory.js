(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../resolvers/model-resolver", "property-resolver"], factory);
    }
})(function (require, exports) {
    "use strict";
    var model_resolver_1 = require("../resolvers/model-resolver");
    var property_resolver_1 = require("property-resolver");
    var ModelResolverFactory = (function () {
        function ModelResolverFactory(propertyResolver) {
            var _this = this;
            if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
            this.propertyResolver = propertyResolver;
            this.createModelResolver = function (model) {
                return new model_resolver_1.ModelResolver(_this.propertyResolver, model);
            };
        }
        return ModelResolverFactory;
    }());
    exports.ModelResolverFactory = ModelResolverFactory;
});
