import {EventHandler} from "event-js";
import {IModelWatcher} from "./watcher/imodel-watcher";
export interface IValidationGroup
{
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;

    validate(): Promise<boolean>;
    getModelErrors(): Promise<any>;
    getPropertyError(propertyRoute: string): Promise<any>;

    modelWatcher: IModelWatcher;

    changeValidationTarget(model: any);
    release(): void;
}