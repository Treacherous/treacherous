import {IModelResolver} from "../resolvers/imodel-resolver";

export interface IModelResolverFactory
{
    createModelResolver(model: any): IModelResolver;
}