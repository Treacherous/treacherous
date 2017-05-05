import { ModelWatcher } from "../watcher/model-watcher";
export class ModelWatcherFactory {
    constructor() {
        this.createModelWatcher = () => {
            return new ModelWatcher();
        };
    }
}
