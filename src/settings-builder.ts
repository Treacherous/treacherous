import {ValidationSettings} from "./validation-settings";
export class SettingsBuilder {
    public Settings:ValidationSettings;

    constructor(settings:ValidationSettings) {
        this.Settings = new ValidationSettings(); // We have to clone these manually to avoid Object.assign (ES6)
        this.Settings.createModelWatcher = settings.createModelWatcher;
        this.Settings.createPropertyResolver = settings.createPropertyResolver;
    }

    setModelWatcherFactory(value:any):SettingsBuilder {
        this.Settings.createModelWatcher = value;
        return this;
    }

    setPropertyResolverFactory(value:any):SettingsBuilder {
        this.Settings.createPropertyResolver = value;
        return this;
    }

}
