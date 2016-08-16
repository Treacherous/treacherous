System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ModelResolver;
    return {
        setters:[],
        execute: function() {
            ModelResolver = (function () {
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
            exports_1("ModelResolver", ModelResolver);
        }
    }
});
