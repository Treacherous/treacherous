"use strict";
var property_resolver_1 = require("property-resolver");
var event_js_1 = require("event-js");
var type_helper_1 = require("../helpers/type-helper");
var property_watcher_1 = require("./property-watcher");
var property_changed_event_1 = require("../events/property-changed-event");
var ModelWatcher = (function () {
    function ModelWatcher(propertyResolver) {
        var _this = this;
        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
        this.propertyResolver = propertyResolver;
        this.watchCache = [];
        this.watchCacheKeys = [];
        this.watcherInterval = null;
        this.setupWatcher = function (model, ruleset, scanInterval) {
            if (scanInterval === void 0) { scanInterval = 500; }
            _this.model = model;
            _this.ruleset = ruleset;
            _this.scanInterval = scanInterval;
            _this.watchCache = [];
            _this.watchCacheKeys = [];
            _this.cacheWatchTargets("", _this.ruleset);
            _this.scanProperties();
            _this.startWatching();
        };
        this.changeWatcherTarget = function (model) {
            _this.model = model;
            _this.scanProperties();
        };
        this.startWatching = function () {
            _this.stopWatching();
            _this.watcherInterval = setInterval(_this.scanProperties, _this.scanInterval);
        };
        this.stopWatching = function () {
            if (_this.watcherInterval) {
                clearInterval(_this.watcherInterval);
            }
        };
        this.updateAndNotifyDifferences = function () {
            var previousKeyCache = _this.watchCacheKeys;
            var previousWatchCache = _this.watchCache;
            _this.watchCache = [];
            _this.watchCacheKeys = [];
            _this.cacheWatchTargets("", _this.ruleset);
            _this.watchCacheKeys.forEach(function (key, index) {
                if (previousKeyCache.indexOf(key) == -1) {
                    var previousValue = _this.watchCache[index].previousValue;
                    var propertyChangedArgs = new property_changed_event_1.PropertyChangedEvent(key, previousValue, null);
                    setTimeout(function () { _this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                }
                else if (previousWatchCache[index].previousValue && previousWatchCache[index].previousValue.isArray) {
                    if (previousWatchCache[index].previousValue.length != _this.watchCache[index].previousValue.length) {
                        var newValue = _this.watchCache[index].previousValue;
                        var previousValue = previousWatchCache[index].previousValue;
                        var propertyChangedArgs = new property_changed_event_1.PropertyChangedEvent(key, newValue, previousValue);
                        setTimeout(function () { _this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    }
                }
            });
        };
        this.watchProperty = function (watchRoute, previousData) {
            if (_this.watchCacheKeys.indexOf(watchRoute) == -1) {
                var propertyWatcher = new property_watcher_1.PropertyWatcher(watchRoute, previousData);
                _this.watchCache.push(propertyWatcher);
                _this.watchCacheKeys.push(watchRoute);
            }
        };
        this.cacheWatchTargets = function (propertyStack, ruleset) {
            var paramRoute, parameterRules;
            var anyRulesAreForEach, anyRulesAreSets;
            var hasValue, currentValue;
            for (var param in ruleset.rules) {
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
                    currentValue = _this.propertyResolver.resolveProperty(_this.model, paramRoute);
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
                parameterRules.forEach(function (rule) {
                    var isArray = type_helper_1.TypeHelper.isArrayType(currentValue);
                    if (isArray) {
                        var cachedArrayInfo = { length: currentValue.length, isArray: true };
                        _this.watchProperty(paramRoute, cachedArrayInfo);
                    }
                    if (rule.isForEach && hasValue) {
                        // ruleset
                        if (rule.internalRule.getRulesForProperty) {
                            if (_this.model[param]) {
                                _this.model[param].forEach(function (element, index) {
                                    _this.cacheWatchTargets(paramRoute + "[" + index + "]", rule.internalRule);
                                });
                            }
                        }
                        else {
                            if (_this.model[param]) {
                                _this.model[param].forEach(function (element, index) {
                                    _this.watchProperty(paramRoute + "[" + index + "]", _this.model[param][index]);
                                });
                            }
                        }
                    }
                    else {
                        // ruleset
                        if (rule.getRulesForProperty) {
                            _this.cacheWatchTargets(paramRoute, rule);
                        }
                        else {
                            if (!isArray) {
                                _this.watchProperty(paramRoute, currentValue);
                            }
                        }
                    }
                });
            }
        };
        this.scanProperties = function () {
            if (_this.onPropertyChanged.getSubscriptionCount() == 0) {
                return;
            }
            if (_this.watchCache.length == 0) {
                return;
            }
            var refreshOnNextCycle = false;
            _this.watchCache.forEach(function (propertyWatcher) {
                var currentValue;
                var hasChanged = false;
                try {
                    currentValue = _this.propertyResolver.resolveProperty(_this.model, propertyWatcher.propertyPath);
                }
                catch (ex) { }
                if (typeof (currentValue) == "undefined") {
                    currentValue = propertyWatcher.previousValue;
                }
                if (propertyWatcher.previousValue && propertyWatcher.previousValue.isArray) {
                    var currentLength = currentValue.length || 0;
                    if (currentLength != propertyWatcher.previousValue.length) {
                        hasChanged = true;
                    }
                }
                else if (currentValue !== propertyWatcher.previousValue) {
                    var propertyChangedArgs = new property_changed_event_1.PropertyChangedEvent(propertyWatcher.propertyPath, currentValue, propertyWatcher.previousValue);
                    setTimeout(function () { _this.onPropertyChanged.publish(propertyChangedArgs); }, 1);
                    propertyWatcher.previousValue = currentValue;
                }
                if (hasChanged) {
                    refreshOnNextCycle = true;
                }
            });
            if (refreshOnNextCycle) {
                setTimeout(_this.updateAndNotifyDifferences, 1);
            }
        };
        this.onPropertyChanged = new event_js_1.EventHandler(this);
    }
    return ModelWatcher;
}());
exports.ModelWatcher = ModelWatcher;
