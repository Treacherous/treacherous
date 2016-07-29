import {IPropertyResolver} from "./iproperty-resolver";

export class ModelHelper
{
    constructor(private propertyResolver:IPropertyResolver, public model:any){
    }

    resolve(propertyName:any) {
        return this.propertyResolver.resolveProperty(this.model || {}, propertyName)
    };

    decomposePropertyRoute(propertyName) {
        return this.propertyResolver.decomposePropertyRoute(propertyName);
    }

}
