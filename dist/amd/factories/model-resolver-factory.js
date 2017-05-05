define(["require", "exports", "../resolvers/model-resolver", "property-resolver"], function (require, exports, model_resolver_1, property_resolver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModelResolverFactory = (function () {
        function ModelResolverFactory(propertyResolver) {
            if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
            var _this = this;
            this.propertyResolver = propertyResolver;
            this.createModelResolver = function (model) {
                return new model_resolver_1.ModelResolver(_this.propertyResolver, model);
            };
        }
        return ModelResolverFactory;
    }());
    exports.ModelResolverFactory = ModelResolverFactory;
});
