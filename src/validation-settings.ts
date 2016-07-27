import {PropertyResolver} from "property-resolver";
import {ModelWatcher} from "./watcher/model-watcher";
import {IModelWatcher} from "./watcher/imodel-watcher";
import {IPropertyResolver} from "./iproperty-resolver";
import {IValidationSettings} from "./ivalidation-settings";

export class ValidationSettings implements IValidationSettings {
    createModelWatcher:(any?)=>IModelWatcher;
    createPropertyResolver:(any?)=>IPropertyResolver;
    useModelWatcher:boolean = true;

    constructor(params?:IValidationSettings) {
        Object.assign(this, params);
        this.createPropertyResolver = this.createPropertyResolver || (() => new PropertyResolver());
        this.createModelWatcher = this.createModelWatcher || (() => new ModelWatcher());
    }
}

export const validationSettingsDefaults = new ValidationSettings();
