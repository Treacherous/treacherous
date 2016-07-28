import { IModelWatcher } from "./watcher/imodel-watcher";
import { IPropertyResolver } from "./iproperty-resolver";
export interface IValidationSettings {
    createModelWatcher: (any?) => IModelWatcher;
    createPropertyResolver: (any?) => IPropertyResolver;
}
