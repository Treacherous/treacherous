import { EventHandler } from "event-js";
export interface IReactiveValidationGroup {
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;
    validate(): Promise<boolean>;
    validateProperty(propertyname: any): Promise<boolean>;
    getModelErrors(): Promise<any>;
    getPropertyError(propertyRoute: string): Promise<any>;
    changeValidationTarget(model: any): any;
    release(): void;
}
