import {IModelWatcher} from "./watcher/imodel-watcher";
import {IPropertyResolver} from "./iproperty-resolver";
import {IValidationSettings} from "./ivalidation-settings";
import {SettingsBuilder} from "./settings-builder";

export class ValidationSettings implements IValidationSettings {
    createModelWatcher:(any?)=>IModelWatcher = null;
    createPropertyResolver:(any?)=>IPropertyResolver = null;

    configure(fn: (builder: SettingsBuilder) => void): ValidationSettings {
        let builder = new SettingsBuilder(this);
        fn(builder);
        return builder.Settings;
    }
}

