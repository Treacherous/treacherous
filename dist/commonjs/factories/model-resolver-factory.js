"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_resolver_1 = require("../resolvers/model-resolver");
var property_resolver_1 = require("property-resolver");
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
