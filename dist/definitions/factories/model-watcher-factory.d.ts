import { IModelWatcherFactory } from "./imodel-watcher-factory";
import { IModelWatcher } from "../watcher/imodel-watcher";
import { PropertyResolver } from "property-resolver/index";
export declare class ModelWatcherFactory implements IModelWatcherFactory {
    private propertyResolver;
    constructor(propertyResolver: PropertyResolver);
    createModelWatcher(): IModelWatcher;
}
