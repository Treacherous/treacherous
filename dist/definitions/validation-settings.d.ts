import { IModelWatcher } from "./watcher/imodel-watcher";
import { IPropertyResolver } from "./iproperty-resolver";
import { IValidationSettings } from "./ivalidation-settings";
import { SettingsBuilder } from "./settings-builder";
export declare class ValidationSettings implements IValidationSettings {
    createModelWatcher: (any?) => IModelWatcher;
    createPropertyResolver: (any?) => IPropertyResolver;
    configure(fn: (builder: SettingsBuilder) => void): ValidationSettings;
}
