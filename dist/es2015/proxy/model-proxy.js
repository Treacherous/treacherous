import { EventHandler } from "event-js";
import { PropertyChangedEvent } from "../events/property-changed-event";
export class ModelProxy {
    constructor() {
        this.proxyObject = (model, ruleset) => { return this.walkModelAndProxy(model, null, ruleset); };
        this.createHandler = (propertyRoute) => {
            const propertyChangedRaiser = this.onPropertyChanged;
            return {
                set: function (obj, prop, value) {
                    const currentValue = obj[prop];
                    if (currentValue !== value) {
                        Reflect.set(obj, prop, value);
                        const propertyChangedArgs = new PropertyChangedEvent(propertyRoute, value, currentValue);
                        setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                    }
                    return true;
                },
                get: function (obj, prop) {
                    return Reflect.get(obj, prop);
                }
            };
        };
        this.proxyProperty = (obj, propertyRoute) => {
            return new Proxy(obj, this.createHandler(propertyRoute));
        };
        this.walkModelAndProxy = (parent, currentRoute, ruleset) => {
            let paramRoute;
            let parameterRules;
            for (const param in ruleset.rules) {
                paramRoute = currentRoute ? currentRoute + "." + param : param;
                parameterRules = ruleset.rules[param];
                let isArray = false;
                let isObject = false;
                parameterRules.forEach((rule) => {
                    const nextProperty = parent[param];
                    isArray = rule.isForEach;
                    if (isArray) {
                        nextProperty.forEach((element, index) => {
                            if (rule.internalRule.getRulesForProperty) {
                                nextProperty[index] = this.walkModelAndProxy(element, `${paramRoute}[${index}]`, rule.internalRule);
                            }
                        });
                    }
                    else {
                        if (rule.getRulesForProperty) {
                            isObject = true;
                            parent[param] = this.walkModelAndProxy(nextProperty, paramRoute, rule);
                        }
                    }
                });
                if (isArray || isObject) {
                    parent[param] = this.proxyProperty(parent[param], paramRoute);
                }
            }
            return this.proxyProperty(parent, currentRoute);
        };
        this.onPropertyChanged = new EventHandler(this);
    }
}
