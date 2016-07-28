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
