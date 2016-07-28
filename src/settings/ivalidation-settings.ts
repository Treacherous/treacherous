import {IModelWatcher} from "../watcher/imodel-watcher";
import {IPropertyResolver} from "property-resolver";
import {IModelResolver} from "../resolvers/imodel-resolver";

export interface IValidationSettings {
    createModelWatcher:(args?: any) => IModelWatcher;
    createModelResolver: (args?: any) => IModelResolver;
    createPropertyResolver:(args?: any) => IPropertyResolver;
}
