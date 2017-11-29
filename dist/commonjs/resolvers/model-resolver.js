"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelResolver = /** @class */ (function () {
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
