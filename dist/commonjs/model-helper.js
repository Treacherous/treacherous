"use strict";
var ModelHelper = (function () {
    function ModelHelper(propertyResolver, model) {
        this.propertyResolver = propertyResolver;
        this.model = model;
    }
    ModelHelper.prototype.resolve = function (propertyName) {
        return this.propertyResolver.resolveProperty(this.model || {}, propertyName);
    };
    ;
    ModelHelper.prototype.decomposePropertyRoute = function (propertyName) {
        return this.propertyResolver.decomposePropertyRoute(propertyName);
    };
    return ModelHelper;
}());
exports.ModelHelper = ModelHelper;
