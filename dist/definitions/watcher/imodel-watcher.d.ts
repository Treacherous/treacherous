import { EventHandler } from "event-js";
import { Ruleset } from "../rulesets/ruleset";
export interface IModelWatcher {
    scanInterval: any;
    onPropertyChanged: EventHandler;
    setupWatcher: (model: any, ruleset: Ruleset, scanInterval: number) => void;
    changeWatcherTarget: (model: any) => void;
    startWatching: () => void;
    stopWatching: () => void;
}
