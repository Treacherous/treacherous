import { IModelWatcher } from "../watcher/imodel-watcher";
import { IModelWatcherFactory } from "./imodel-watcher-factory";
export declare class ModelWatcherFactory implements IModelWatcherFactory {
    createModelWatcher: () => IModelWatcher;
}
