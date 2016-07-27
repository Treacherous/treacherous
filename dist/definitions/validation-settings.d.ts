import { IModelWatcher } from "./watcher/imodel-watcher";
import { IPropertyResolver } from "./iproperty-resolver";
import { IValidationSettings } from "./ivalidation-settings";
export declare class ValidationSettings implements IValidationSettings {
    createModelWatcher: (any?) => IModelWatcher;
    createPropertyResolver: (any?) => IPropertyResolver;
    useModelWatcher: boolean;
    constructor(params?: IValidationSettings);
}
export declare const validationSettingsDefaults: ValidationSettings;
