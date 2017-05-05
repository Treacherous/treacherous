import { IModelResolver } from "../resolvers/imodel-resolver";
import { IPropertyResolver } from "../resolvers/iproperty-resolver";
export declare class ModelResolverFactory {
    private propertyResolver;
    constructor(propertyResolver?: IPropertyResolver);
    createModelResolver: (model: any) => IModelResolver;
}
