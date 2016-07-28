import {IPropertyResolver} from "property-resolver";
import {ModelWatcher} from "../watcher/model-watcher";
import {IModelWatcher} from "../watcher/imodel-watcher";
import {IValidationSettings} from "./ivalidation-settings";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {ModelResolver} from "../resolvers/model-resolver";

export class DefaultValidationSettings implements IValidationSettings
{
    public createModelWatcher(args?: any): IModelWatcher
    { return new ModelWatcher(this.propertyResolver); }

    public createModelResolver(args?: any): IModelResolver
    { return new ModelResolver(this.propertyResolver, args); }

    public createPropertyResolver(args?: any): IPropertyResolver
    { return this.propertyResolver; }

    constructor(private propertyResolver: IPropertyResolver) {}
}