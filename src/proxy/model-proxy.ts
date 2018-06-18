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
                    obj[prop] = value;
                    const propertyChangedArgs = new PropertyChangedEvent(propertyRoute, value, currentValue);
                    setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                    return true;
                }
            },
            get: function(obj: any, prop: PropertyKey) {
                return Reflect.get(obj, prop);
            }
        }
    };

    public createValueTypeHandler = (parent: any, prop: any, propertyRoute: string): any => {
        const propertyChangedRaiser = this.onPropertyChanged;
        return {
            set: function(obj: any, prop: PropertyKey, value: any){
                const currentValue =  parent[prop];
                if(currentValue !== value){
                    parent[prop] = value;
                    const propertyChangedArgs = new PropertyChangedEvent(propertyRoute, value, currentValue);
                    setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                    return true;
                }
            },
            get: function(obj: any, prop: PropertyKey) {
                return parent[prop];
            }
        }
    };

    private proxyProperty = (parent: any, prop: PropertyKey, propertyRoute: string, isComplexType = true) => {
        console.log("PROXYING", propertyRoute);
        if(isComplexType)
        { parent[prop] = new Proxy(parent[prop], this.createHandler(propertyRoute)); }
        else
        { parent[prop] = new Proxy({}, this.createValueTypeHandler(parent, prop, propertyRoute)); }
    };

    private walkModelAndProxy = (parent: any, currentRoute: string, ruleset: Ruleset) => {

        let paramRoute: any;
        let parameterRules: any;

        for(const param in ruleset.rules) {
            paramRoute = currentRoute ? currentRoute + "." + param : param;
            parameterRules = ruleset.rules[param];

            let shouldTreatAsArray = false;
            let shouldTreatAsObject = false;
            parameterRules.forEach(function(rule: any){
                if(rule.isForEach) { shouldTreatAsArray = true; }
                if(rule.getRulesForProperty) { shouldTreatAsObject = true; }
            });

            parameterRules.forEach((rule: any) => {
                const nextProperty = parent[param];
                const isArray = rule.isForEach;
                if(isArray)
                {
                    nextProperty.forEach((element: any, index: number) => {
                        if(rule.internalRule.getRulesForProperty)
                        { this.walkModelAndProxy(element, `${paramRoute}[${index}]`, rule.internalRule); }
                        else
                        { this.proxyProperty(nextProperty, index, `${paramRoute}[${index}]`, false); }
                    });
                }
                else
                {
                    if(rule.getRulesForProperty)
                    { this.walkModelAndProxy(nextProperty, paramRoute, rule); }
                }
            });

            this.proxyProperty(parent, param, paramRoute, shouldTreatAsArray || shouldTreatAsObject);
        }

        return new Proxy(parent, this.createHandler(currentRoute));
    }
}