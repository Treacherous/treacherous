import {IPropertyResolver} from "./iproperty-resolver";
import {IModelResolver} from "./imodel-resolver";

export class ModelResolver implements IModelResolver
{
    constructor(private propertyResolver: IPropertyResolver, public model: any){}

    resolve(propertyName: any): any {
        return this.propertyResolver.resolveProperty(this.model, propertyName);
    };
}
