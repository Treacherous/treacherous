import { IPropertyResolver } from "./iproperty-resolver";
export declare class ModelResolver {
    private propertyResolver;
    model: any;
    constructor(propertyResolver: IPropertyResolver, model: any);
    get(propertyName: any): any;
    option(varOrProperty: any): any;
}
