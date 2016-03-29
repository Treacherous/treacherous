import { PropertyResolver } from "property-resolver";
import { EventHandler } from "eventjs";
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
    constructor(propertyResolver?: PropertyResolver);
    setupWatcher: (model: any, ruleset: Ruleset, scanInterval?: number) => void;
    startWatching: () => void;
    stopWatching: () => void;
    private updateAndNotifyDifferences;
    private watchProperty;
    private cacheWatchTargets;
    private scanProperties;
}
