import { IPropertyResolver } from "property-resolver";
import { IModelResolver } from "./imodel-resolver";
export declare class ModelResolver implements IModelResolver {
    private propertyResolver;
    model: any;
    constructor(propertyResolver: IPropertyResolver, model: any);
    resolve(propertyName: any): any;
}
