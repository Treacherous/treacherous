import { EventHandler } from "event-js";
import { PropertyChangedEvent } from "../events/property-changed-event";
export class ModelProxy {
    constructor() {
        this.proxyObject = (model, ruleset) => { this.walkModelAndProxy(model, null, ruleset); };
        this.createHandler = (propertyRoute) => {
            const propertyChangedRaiser = this.onPropertyChanged;
            return {
                set: function (obj, prop, value) {
                    if (obj[prop] !== value) {
                        const oldValue = obj[prop];
                        obj[prop] = value;
                        const propertyChangedArgs = new PropertyChangedEvent(propertyRoute, value, oldValue);
                        setTimeout(() => { propertyChangedRaiser.publish(propertyChangedArgs); }, 1);
                    }
                }
            };
        };
        this.proxyProperty = (parent, prop, propertyRoute) => {
            parent[prop] = new Proxy(parent[prop], this.createHandler(propertyRoute));
        };
        this.walkModelAndProxy = (parent, currentRoute, ruleset) => {
            let paramRoute;
            let parameterRules;
            let anyRulesAreForEach;
            let anyRulesAreSets;
            for (const param in ruleset.rules) {
                paramRoute = currentRoute ? currentRoute + "." + param : param;
                parameterRules = ruleset.rules[param];
                parameterRules.forEach(function (rule) {
                    if (rule.isForEach) {
                        anyRulesAreForEach = true;
                    }
                    if (rule.getRulesForProperty) {
                        anyRulesAreSets = true;
                    }
                });
                parameterRules.forEach((rule) => {
                    const nextProperty = parent[param];
                    const isArray = rule.isForEach;
                    if (isArray) {
                        nextProperty.forEach((element, index) => {
                            if (rule.internalRule.getRulesForProperty) {
                                this.walkModelAndProxy(element, `${paramRoute}[${index}]`, rule.internalRule);
                            }
                            else {
                                this.proxyProperty(nextProperty, `${paramRoute}[${index}]`, index);
                            }
                        });
                        this.proxyProperty(parent, paramRoute, param);
                    }
                    else {
                        if (rule.internalRule.getRulesForProperty) {
                            this.walkModelAndProxy(nextProperty, paramRoute, rule.internalRule);
                        }
                        else {
                            this.proxyProperty(parent, paramRoute, param);
                        }
                    }
                });
            }
        };
        this.onPropertyChanged = new EventHandler(this);
    }
}
