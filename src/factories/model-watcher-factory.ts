import {IModelWatcher} from "../watcher/imodel-watcher";
import {IModelWatcherFactory} from "./imodel-watcher-factory";
import {ModelWatcher} from "../watcher/model-watcher";

export class ModelWatcherFactory implements IModelWatcherFactory
{
    public createModelWatcher = (): IModelWatcher => {
        return new ModelWatcher();
    }
}