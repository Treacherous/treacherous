import { PropertyResolver } from "property-resolver";
import { EventHandler } from "event-js";
import { TypeHelper } from "../helpers/type-helper";
import { PropertyWatcher } from "./property-watcher";
import { PropertyChangedEvent } from "../events/property-changed-event";
export class ModelWatcher {
    constructor(propertyResolver = new PropertyResolver()) {
        this.propertyResolver = propertyResolver;
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.watcherInterval = null;
        this.setupWatcher = (model, ruleset, scanInterval = 500) => {
            this.model = model;
            this.ruleset = ruleset;
            this.scanInterval = scanInterval;
            this.watchCache = [];
            this.watchCacheKeys = [];
            this.cacheWatchTargets("", this.ruleset);
            this.scanProperties();
            this.startWatching();
        };
        this.changeWatcherTarget = (model) => {
            this.model = model;
            this.scanProperties();
        };
        this.startWatching = () => {
            this.stopWatching();
            this.watcherInterval = setInterval(this.scanProperties, this.scanInterval);
        };
        this.stopWatching = () => {
            if (this.watcherInterval) {
                clearInterval(this.watcherInterval);
            }
        };
        this.updateAndNotifyDifferences = () => {
            const previousKeyCache = this.watchCacheKeys;
            const previousWatchCache = this.watchCache;
            this.watchCache = [];
            this.watchCacheKeys = [];
            this.cacheWatchTargets("", this.ruleset);
            this.watchCacheKeys.forEach((key, index) => {
                let previousValue;
                if (previousKeyCache.indexOf(key) == -1) {
                    previousValue = this.watchCache[index].previousValue;
                    const propertyChangedArgs = new PropertyChangedEvent(key, previousValue, null);
                    setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                }
                else if (previousWatchCache[index].previousValue && previousWatchCache[index].previousValue.isArray) {
                    if (previousWatchCache[index].previousValue.length != this.watchCache[index].previousValue.length) {
                        const newValue = this.watchCache[index].previousValue;
                        previousValue = previousWatchCache[index].previousValue;
                        const propertyChangedArgs = new PropertyChangedEvent(key, newValue, previousValue);
                        setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    }
                }
            });
        };
        this.watchProperty = (watchRoute, previousData) => {
            if (this.watchCacheKeys.indexOf(watchRoute) == -1) {
                const propertyWatcher = new PropertyWatcher(watchRoute, previousData);
                this.watchCache.push(propertyWatcher);
                this.watchCacheKeys.push(watchRoute);
            }
        };
        this.cacheWatchTargets = (propertyStack, ruleset) => {
            let paramRoute, parameterRules;
            let anyRulesAreForEach, anyRulesAreSets;
            let hasValue, currentValue;
            for (const param in ruleset.rules) {
                paramRoute = propertyStack ? propertyStack + "." + param : param;
                parameterRules = ruleset.rules[param];
                anyRulesAreForEach = false;
                anyRulesAreSets = false;
                parameterRules.forEach(function (rule) {
                    if (rule.isForEach) {
                        anyRulesAreForEach = true;
                    }
                    if (rule.getRulesForProperty) {
                        anyRulesAreSets = true;
                    }
                });
                hasValue = false;
                try {
                    currentValue = this.propertyResolver.resolveProperty(this.model, paramRoute);
                    hasValue = true;
                }
                catch (ex) { }
                if (currentValue == null && (anyRulesAreForEach || anyRulesAreSets)) {
                    if (anyRulesAreForEach) {
                        currentValue = [];
                    }
                    else if (anyRulesAreSets) {
                        currentValue = {};
                    }
                    else {
                        currentValue = null;
                    }
                }
                parameterRules.forEach((rule) => {
                    const isArray = TypeHelper.isArrayType(currentValue);
                    if (isArray) {
                        const cachedArrayInfo = { length: currentValue.length, isArray: true };
                        this.watchProperty(paramRoute, cachedArrayInfo);
                    }
                    if (rule.isForEach && hasValue) {
                        // ruleset
                        if (rule.internalRule.getRulesForProperty) {
                            if (this.model[param]) {
                                this.model[param].forEach((element, index) => {
                                    this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                                });
                            }
                        }
                        else {
                            if (this.model[param]) {
                                this.model[param].forEach((element, index) => {
                                    this.watchProperty(paramRoute + "[" + index + "]", this.model[param][index]);
                                });
                            }
                        }
                    }
                    else {
                        // ruleset
                        if (rule.getRulesForProperty) {
                            this.cacheWatchTargets(paramRoute, rule);
                        }
                        else {
                            if (!isArray) {
                                this.watchProperty(paramRoute, currentValue);
                            }
                        }
                    }
                });
            }
        };
        this.scanProperties = () => {
            if (this.onPropertyChanged.getSubscriptionCount() == 0) {
                return;
            }
            if (this.watchCache.length == 0) {
                return;
            }
            let refreshOnNextCycle = false;
            this.watchCache.forEach((propertyWatcher) => {
                let currentValue;
                let hasChanged = false;
                try {
                    currentValue = this.propertyResolver.resolveProperty(this.model, propertyWatcher.propertyPath);
                }
                catch (ex) { }
                if (typeof (currentValue) == "undefined") {
                    currentValue = propertyWatcher.previousValue;
                }
                if (propertyWatcher.previousValue && propertyWatcher.previousValue.isArray) {
                    const currentLength = currentValue.length || 0;
                    if (currentLength != propertyWatcher.previousValue.length) {
                        hasChanged = true;
                    }
                }
                else if (currentValue !== propertyWatcher.previousValue) {
                    const propertyChangedArgs = new PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                    setTimeout(() => { this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    propertyWatcher.previousValue = currentValue;
                }
                if (hasChanged) {
                    refreshOnNextCycle = true;
                }
            });
            if (refreshOnNextCycle) {
                setTimeout(this.updateAndNotifyDifferences, 1);
            }
        };
        this.onPropertyChanged = new EventHandler(this);
    }
}
