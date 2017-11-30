import { ModelResolver } from "../resolvers/model-resolver";
import { PropertyResolver } from "property-resolver";
export class ModelResolverFactory {
    constructor(propertyResolver = new PropertyResolver()) {
        this.propertyResolver = propertyResolver;
        this.createModelResolver = (model) => {
            return new ModelResolver(this.propertyResolver, model);
        };
    }
}
