define(["require", "exports", "../resolvers/model-resolver", "property-resolver"], function (require, exports, model_resolver_1, property_resolver_1) {
    "use strict";
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
