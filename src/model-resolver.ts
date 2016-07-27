import {property} from "./helpers/property";
import {PropertyResolver} from "property-resolver";
import {IPropertyResolver} from "./iproperty-resolver";

export class ModelResolver
{
    constructor(private propertyResolver:IPropertyResolver, public model:any){
        if (!propertyResolver)
            this.propertyResolver = new PropertyResolver();
    }

    get(propertyName:any) {
        return this.propertyResolver.resolveProperty(this.model || {}, propertyName)
    };

    option(varOrProperty:any) {
        return (varOrProperty instanceof property) ? this.get(varOrProperty.name) : varOrProperty;
    }
}
