import { IModelProxy } from "./imodel-proxy";
import { Ruleset } from "..";
import { EventHandler } from "event-js";
export declare class ModelProxy implements IModelProxy {
    onPropertyChanged: EventHandler;
    constructor();
    proxyObject: (model: any, ruleset: Ruleset) => void;
    createHandler: (propertyRoute: string) => any;
    private proxyProperty;
    private walkModelAndProxy;
}
