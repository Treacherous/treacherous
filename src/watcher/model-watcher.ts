import {PropertyResolver} from "property-resolver";
import {EventHandler} from "eventjs";
import {TypeHelper} from "../helpers/type-helper";

import {Ruleset} from "../rulesets/ruleset";
import {PropertyWatcher} from "./property-watcher";
import {PropertyChangedEvent} from "./property-changed-event";
import {IModelWatcher} from "./imodel-watcher";

export class ModelWatcher implements IModelWatcher
{
    private watchCache: Array<PropertyWatcher> = [];
    private watchCacheKeys: Array<string> = [];
    private watcherInterval: any = null;
    private model: any;
    private ruleset: Ruleset;

    public scanInterval: any;
    public onPropertyChanged: EventHandler;

    constructor(private propertyResolver = new PropertyResolver()) {
        this.onPropertyChanged = new EventHandler(this);
    }

    public setupWatcher = (model: any, ruleset: Ruleset, scanInterval = 500) => {
        this.model = model;
        this.ruleset = ruleset;
        this.scanInterval = scanInterval;
        this.refreshWatchTargets();
        this.startWatching();
    }

    public startWatching = () => {
        this.stopWatching();
        this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
    };

    public stopWatching = () => {
      if(this.watcherInterval) { clearInterval(this.watcherInterval); }
    };

    private refreshWatchTargets = () => {
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.cacheWatchTargets("", this.ruleset);
        this.scanProperties();
    }

    private watchProperty = (watchRoute, previousData) => {

        if(this.watchCacheKeys.indexOf(watchRoute) == -1)
        {
            var propertyWatcher = new PropertyWatcher(watchRoute, previousData);
            this.watchCache.push(propertyWatcher);
            this.watchCacheKeys.push(watchRoute);
        }
    }

    private cacheWatchTargets = (propertyStack, ruleset) => {
        var paramRoute, parameterRules;
        for(var param in ruleset.rules)
        {
            paramRoute = propertyStack ? propertyStack + "." + param : param;
            parameterRules = ruleset.rules[param];

            parameterRules.forEach((rule) => {
                var currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                var isArray = TypeHelper.isArrayType(currentValue);
                if(isArray)
                {
                    var cachedArrayInfo = { length: currentValue.length, isArray: true };
                    this.watchProperty(paramRoute, cachedArrayInfo);
                }

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
                            this.watchProperty(paramRoute + "[" + index  +"]", this.model[param][index]);
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
                        if(!isArray)
                        { this.watchProperty(paramRoute, currentValue); }
                    }
                }
            });
        }
    };

    private scanProperties = () => {
        if(this.onPropertyChanged.getSubscriptionCount() == 0) { return; }
        if(this.watchCache.length == 0) { return; }

        var refreshOnNextCycle = false;
        this.watchCache.forEach((propertyWatcher: PropertyWatcher) => {
            var currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);

            if(currentValue && propertyWatcher.previousValue.isArray)
            {
                if(currentValue.length != propertyWatcher.previousValue.length)
                { refreshOnNextCycle = true; }

                if(currentValue.length > propertyWatcher.previousValue.length)
                {
                    for(var i=propertyWatcher.previousValue.length; i< currentValue.length;i++)
                    {
                        var propertyChangedArgs = new PropertyChangedEvent(`${propertyWatcher.propertyPath}[${i}]`, currentValue[i], null);
                        setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    }
                }
            }
            else if (currentValue !== propertyWatcher.previousValue) {
                var propertyChangedArgs = new PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                propertyWatcher.previousValue = currentValue;
            }
        });

        if(refreshOnNextCycle)
        { setTimeout(this.refreshWatchTargets, 1); }
    };
}