import {PropertyResolver} from "property-resolver";
import {property} from "./helpers/property";

export class ModelResolver
{
    constructor(private propertyResolver:PropertyResolver, public model:any){
    }

    get(propertyName:any) {
        return this.propertyResolver.resolveProperty(this.model || {}, propertyName)
    };

    option(varOrProperty:any) {
        return (varOrProperty instanceof property) ? this.get(varOrProperty.name) : varOrProperty;
    }
}
