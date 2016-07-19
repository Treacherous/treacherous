import {IModelWatcher} from "../watcher/imodel-watcher";

export interface IModelWatcherFactory
{
    createModelWatcher(): IModelWatcher;
}