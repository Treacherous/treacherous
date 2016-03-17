import {PropertyResolver} from "property-resolver";
import {EventHandler} from "eventjs";

import {Ruleset} from "../rulesets/ruleset";
import {PropertyWatcher} from "./property-watcher";
import {PropertyChangedEvent} from "./property-changed-event";

export class ModelWatcher
{
    private watchCache: Array<PropertyWatcher> = [];
    private watcherInterval: any = null;

    public onPropertyChanged: EventHandler;

    constructor(public model: any, public ruleset: Ruleset,
        public scanInterval = 500, private propertyResolver = new PropertyResolver()) {
        this.onPropertyChanged = new EventHandler(this);
        this.cacheWatchTargets("", this.ruleset);
        this.scanProperties();
        this.startWatching();
    }

    public startWatching = () => {
        this.stopWatching();
        this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
    };

    public stopWatching = () => {
      if(this.watcherInterval) { clearInterval(this.watcherInterval); }
    };

    private cacheWatchTargets = (propertyStack, ruleset) => {
        var paramRoute, parameterRules;
        for(var param in ruleset.rules)
        {
            paramRoute = propertyStack ? propertyStack + "." + param : param;
            parameterRules = ruleset.rules[param];

            parameterRules.forEach((rule) => {
                if(rule.isForEach)
                {
                    // ruleset
                    if(rule.internalRule.getRulesForProperty)
                    {
                        this.model[param].forEach((element, index) => {
                            this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                        });
                    }
                    else
                    {
                        this.model[param].forEach((element, index) => {
                            this.watchCache.push(new PropertyWatcher(paramRoute + "[" + index  +"]", this.model[param][index]))
                        });
                    }
                }
                else
                {
                    // ruleset
                    if(rule.getRulesForProperty)
                    {
                        this.cacheWatchTargets(paramRoute, rule);
                    }
                    else
                    {
                        var currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                        this.watchCache.push(new PropertyWatcher(paramRoute, currentValue));
                    }
                }
            });
        }
    };

    private scanProperties = () => {
        if(this.onPropertyChanged.getSubscriptionCount() == 0) { return; }
        if(this.watchCache.length == 0) { return; }

        this.watchCache.forEach((propertyWatcher: PropertyWatcher) => {
            var currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);

            if (currentValue !== propertyWatcher.previousValue) {
                var propertyChangedArgs = new PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                propertyWatcher.previousValue = currentValue;
            }
        });
    };
}