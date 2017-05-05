System.register(["../resolvers/model-resolver", "property-resolver"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_resolver_1, property_resolver_1, ModelResolverFactory;
    return {
        setters: [
            function (model_resolver_1_1) {
                model_resolver_1 = model_resolver_1_1;
            },
            function (property_resolver_1_1) {
                property_resolver_1 = property_resolver_1_1;
            }
        ],
        execute: function () {
            ModelResolverFactory = (function () {
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
            exports_1("ModelResolverFactory", ModelResolverFactory);
        }
    };
});
