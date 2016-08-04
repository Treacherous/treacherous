import { IPropertyResolver } from "property-resolver";
import { EventHandler } from "event-js";
import { Ruleset } from "../rulesets/ruleset";
import { IModelWatcher } from "./imodel-watcher";
export declare class ModelWatcher implements IModelWatcher {
    private propertyResolver;
    private watchCache;
    private watchCacheKeys;
    private watcherInterval;
    private model;
    private ruleset;
    scanInterval: any;
    onPropertyChanged: EventHandler;
    constructor(propertyResolver?: IPropertyResolver);
    setupWatcher: (model: any, ruleset: Ruleset, scanInterval?: number) => void;
    changeWatcherTarget: (model: any) => void;
    startWatching: () => void;
    stopWatching: () => void;
    private updateAndNotifyDifferences;
    private watchProperty;
    private cacheWatchTargets;
    private scanProperties;
}
