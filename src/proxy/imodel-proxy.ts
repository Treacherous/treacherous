import {EventHandler} from "event-js";
import {Ruleset} from "../rulesets/ruleset";

export interface IModelProxy
{
    onPropertyChanged: EventHandler;
    proxyObject: (model: any, ruleset: Ruleset) => any;
}