import {EventHandler} from "event-js";
export interface IValidationGroup
{
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;

    isValid(): Promise<boolean>;
    getModelErrors(): Promise<any>;
    getPropertyError(propertyRoute: string): Promise<any>;

    changeValidationTarget(model: any);
    release(): void;
}