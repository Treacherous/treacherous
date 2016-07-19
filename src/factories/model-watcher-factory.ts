import {IModelWatcherFactory} from "./imodel-watcher-factory";
import {IModelWatcher} from "../watcher/imodel-watcher";
import {ModelWatcher} from "../watcher/model-watcher";
import {PropertyResolver} from "property-resolver/index";

export class ModelWatcherFactory implements IModelWatcherFactory
{
    constructor(private propertyResolver: PropertyResolver)
    {}

    createModelWatcher():IModelWatcher {
        return new ModelWatcher(this.propertyResolver);
    }
}