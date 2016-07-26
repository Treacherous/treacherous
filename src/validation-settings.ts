import {PropertyResolver} from "property-resolver";
import {ModelWatcher} from "./watcher/model-watcher";
import {IModelWatcher} from "./watcher/imodel-watcher";
import {IPropertyResolver} from "./iproperty-resolver";
import {IValidationSettings} from "./ivalidation-settings";

export class ValidationSettings implements IValidationSettings {
    createModelWatcher:(any)=>IModelWatcher;
    createPropertyResolver:(any)=>IPropertyResolver;

    constructor(...params) {
        this.createPropertyResolver = () => new PropertyResolver();
        this.createModelWatcher = () => new ModelWatcher();
        Object.assign(this, params);
    }
}

export var validationSettingsDefaults = new ValidationSettings();
