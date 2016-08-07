import {IModelResolver} from "../resolvers/imodel-resolver";
import {ModelResolver} from "../resolvers/model-resolver";
import {PropertyResolver} from "property-resolver";
import {IPropertyResolver} from "../resolvers/iproperty-resolver";

export class ModelResolverFactory
{
    constructor(private propertyResolver: IPropertyResolver = new PropertyResolver()) {}

    public createModelResolver = (model: any): IModelResolver => {
        return new ModelResolver(this.propertyResolver, model);
    }
}