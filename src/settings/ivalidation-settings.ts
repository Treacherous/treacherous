import {IModelWatcher} from "../watcher/imodel-watcher";
import {IPropertyResolver} from "../resolvers/iproperty-resolver";
import {IModelResolver} from "../resolvers/imodel-resolver";

export interface IValidationSettings {
    createModelWatcher:(args?: any) => IModelWatcher;
    createModelResolver: (args?: any) => IModelResolver;
    createPropertyResolver:(args?: any) => IPropertyResolver;
}
