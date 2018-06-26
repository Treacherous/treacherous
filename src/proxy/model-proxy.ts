import {IModelProxy} from "./imodel-proxy";
import {Ruleset, TypeHelper} from "..";
import {EventHandler} from "event-js";
import {PropertyChangedEvent} from "../events/property-changed-event";

export class ModelProxy implements IModelProxy
{
    public onPropertyChanged: EventHandler;

    constructor() {
        this.onPropertyChanged = new EventHandler(this);
    }

    public proxyObject = (model: any, ruleset: Ruleset): any =>
    { return this.walkModelAndProxy(model, null, ruleset); };

    public createHandler = (propertyRoute: string): any => {
        const propertyChangedRaiser = this.onPropertyChanged;
        return {
            set: function(obj: any, prop: PropertyKey, value: any){
                const currentValue = obj[prop];
                if(currentValue !== value){
                    Reflect.set(obj, prop, value);
                    const propertyChangedArgs = new PropertyChangedEvent(propertyRoute, value, currentValue);
                    setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                }
                return true;
            },
            get: function(obj: any, prop: PropertyKey) {
                return Reflect.get(obj, prop);
            }
        }
    };

    private proxyProperty = (obj: any, propertyRoute: string) => {
        return new Proxy(obj, this.createHandler(propertyRoute));
    };

    private walkModelAndProxy = (parent: any, currentRoute: string, ruleset: Ruleset) => {

        let paramRoute: any;
        let parameterRules: any;

        for(const param in ruleset.rules) {
            paramRoute = currentRoute ? currentRoute + "." + param : param;
            parameterRules = ruleset.rules[param];

            let isArray = false;
            let isObject = false;
            parameterRules.forEach((rule: any) => {
                const nextProperty = parent[param];
                isArray = rule.isForEach;
                if(isArray)
                {
                    nextProperty.forEach((element: any, index: number) => {
                        if(rule.internalRule.getRulesForProperty)
                        { nextProperty[index] = this.walkModelAndProxy(element, `${paramRoute}[${index}]`, rule.internalRule); }
                    });
                }
                else
                {
                    if(rule.getRulesForProperty)
                    {
                        isObject = true;
                        parent[param] = this.walkModelAndProxy(nextProperty, paramRoute, rule);
                    }
                }
            });

            if(isArray || isObject)
            { parent[param] = this.proxyProperty(parent[param], paramRoute); }
        }

        return this.proxyProperty(parent, currentRoute);
    }
}