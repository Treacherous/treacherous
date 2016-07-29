import { IPropertyResolver } from "./iproperty-resolver";
export declare class ModelHelper {
    private propertyResolver;
    model: any;
    constructor(propertyResolver: IPropertyResolver, model: any);
    resolve(propertyName: any): any;
    decomposePropertyRoute(propertyName: any): string[];
}
