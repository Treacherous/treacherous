"use strict";
var property_1 = require("./helpers/property");
var property_resolver_1 = require("property-resolver");
var ModelResolver = (function () {
    function ModelResolver(propertyResolver, model) {
        this.propertyResolver = propertyResolver;
        this.model = model;
        if (!propertyResolver)
            this.propertyResolver = new property_resolver_1.PropertyResolver();
    }
    ModelResolver.prototype.get = function (propertyName) {
        return this.propertyResolver.resolveProperty(this.model || {}, propertyName);
    };
    ;
    ModelResolver.prototype.option = function (varOrProperty) {
        return (varOrProperty instanceof property_1.property) ? this.get(varOrProperty.name) : varOrProperty;
    };
    return ModelResolver;
}());
exports.ModelResolver = ModelResolver;
