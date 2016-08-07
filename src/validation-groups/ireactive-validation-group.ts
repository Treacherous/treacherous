import {EventHandler} from "event-js";
import {IValidationGroup} from "./ivalidation-group";

export interface IReactiveValidationGroup extends IValidationGroup
{
    propertyStateChangedEvent: EventHandler;
    modelStateChangedEvent: EventHandler;
}