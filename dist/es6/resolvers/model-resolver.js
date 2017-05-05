export class ModelResolver {
    constructor(propertyResolver, model) {
        this.propertyResolver = propertyResolver;
        this.model = model;
    }
    resolve(propertyName) {
        return this.propertyResolver.resolveProperty(this.model, propertyName);
    }
    ;
}
