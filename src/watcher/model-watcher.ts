import {PropertyResolver, IPropertyResolver} from "property-resolver";
import {EventHandler} from "event-js";
import {TypeHelper} from "../helpers/type-helper";

import {Ruleset} from "../rulesets/ruleset";
import {PropertyWatcher} from "./property-watcher";
import {PropertyChangedEvent} from "../events/property-changed-event";
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

    constructor(private propertyResolver: IPropertyResolver = new PropertyResolver()) {
        this.onPropertyChanged = new EventHandler(this);
    }

    public setupWatcher = (model: any, ruleset: Ruleset, scanInterval = 500) => {
        this.model = model;
        this.ruleset = ruleset;
        this.scanInterval = scanInterval;
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.cacheWatchTargets("", this.ruleset);
        this.scanProperties();
        this.startWatching();
    }

    public changeWatcherTarget = (model: any) => {
        this.model = model;
        this.scanProperties();
    }

    public startWatching = () => {
        this.stopWatching();
        this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
    };

    public stopWatching = () => {
      if(this.watcherInterval) { clearInterval(this.watcherInterval); }
    };

    private updateAndNotifyDifferences = () => {
        let previousKeyCache = this.watchCacheKeys;
        let previousWatchCache = this.watchCache;

        this.watchCache = [];
        this.watchCacheKeys = [];
        this.cacheWatchTargets("", this.ruleset);

        this.watchCacheKeys.forEach((key, index) => {
            let previousValue;

            if(previousKeyCache.indexOf(key) == -1) {
                previousValue = this.watchCache[index].previousValue;
                let propertyChangedArgs = new PropertyChangedEvent(key, previousValue, null);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
            }
            else if(previousWatchCache[index].previousValue && previousWatchCache[index].previousValue.isArray)
            {
                if(previousWatchCache[index].previousValue.length != this.watchCache[index].previousValue.length)
                {
                    let newValue = this.watchCache[index].previousValue;
                    previousValue = previousWatchCache[index].previousValue;
                    let propertyChangedArgs = new PropertyChangedEvent(key, newValue, previousValue);
                    setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                }
            }
        });
    }

    private watchProperty = (watchRoute: string, previousData: any) => {

        if(this.watchCacheKeys.indexOf(watchRoute) == -1)
        {
            let propertyWatcher = new PropertyWatcher(watchRoute, previousData);
            this.watchCache.push(propertyWatcher);
            this.watchCacheKeys.push(watchRoute);
        }
    }

    private cacheWatchTargets = (propertyStack: string, ruleset: Ruleset) => {
        let paramRoute: any, parameterRules: any;
        let anyRulesAreForEach: any, anyRulesAreSets: any;
        let hasValue: any, currentValue: any;

        for(let param in ruleset.rules)
        {
            paramRoute = propertyStack ? propertyStack + "." + param : param;
            parameterRules = ruleset.rules[param];

            anyRulesAreForEach = false;
            anyRulesAreSets = false;
            parameterRules.forEach(function(rule: any){
                if(rule.isForEach) { anyRulesAreForEach = true; }
                if(rule.getRulesForProperty) { anyRulesAreSets = true; }
            });

            hasValue = false;
            try
            {
                currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                hasValue = true;
            }
            catch (ex) {}

            if(currentValue == null && (anyRulesAreForEach || anyRulesAreSets))
            {
                if (anyRulesAreForEach) { currentValue = []; }
                else if (anyRulesAreSets) { currentValue = {}; }
                else { currentValue = null; }
            }

            parameterRules.forEach((rule: any) => {

                let isArray = TypeHelper.isArrayType(currentValue);
                if(isArray)
                {
                    let cachedArrayInfo = { length: currentValue.length, isArray: true };
                    this.watchProperty(paramRoute, cachedArrayInfo);
                }

                if(rule.isForEach && hasValue)
                {
                    // ruleset
                    if(rule.internalRule.getRulesForProperty)
                    {
                        if(this.model[param]) {
                            this.model[param].forEach((element: any, index: number) => {
                                this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                            });
                        }
                    }
                    else
                    {
                        if(this.model[param]) {
                            this.model[param].forEach((element: any, index: number) => {
                                this.watchProperty(paramRoute + "[" + index + "]", this.model[param][index]);
                            });
                        }
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

        let refreshOnNextCycle = false;
        this.watchCache.forEach((propertyWatcher: PropertyWatcher) => {
            let currentValue;
            let hasChanged = false;

            try
            {
                currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);
            }
            catch(ex) { }

            if(typeof(currentValue) == "undefined")
            { currentValue = propertyWatcher.previousValue; }

            if(propertyWatcher.previousValue && propertyWatcher.previousValue.isArray)
            {
                let currentLength = currentValue.length || 0;
                if(currentLength != propertyWatcher.previousValue.length)
                { hasChanged = true; }
            }
            else if (currentValue !== propertyWatcher.previousValue) {
                let propertyChangedArgs = new PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                propertyWatcher.previousValue = currentValue;
            }

            if(hasChanged)
            { refreshOnNextCycle = true; }
        });

        if(refreshOnNextCycle)
        { setTimeout(this.updateAndNotifyDifferences, 1); }
    };
}