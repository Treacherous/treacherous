import { EventHandler } from "event-js";
export interface IValidationGroup {
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;
    validate(): Promise<boolean>;
    validateProperty(propertyname: any): Promise<boolean>;
    getModelErrors(revalidate?: boolean): Promise<any>;
    getPropertyError(propertyRoute: string, revalidate?: boolean): Promise<any>;
    getPropertyDisplayName(propertyRoute: string): string;
    changeValidationTarget(model: any): any;
    release(): void;
}