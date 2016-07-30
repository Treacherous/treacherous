import { ValidationSettings } from "./validation-settings";
export declare class SettingsBuilder {
    Settings: ValidationSettings;
    constructor(settings: ValidationSettings);
    setModelWatcherFactory(value: any): SettingsBuilder;
    setPropertyResolverFactory(value: any): SettingsBuilder;
}
