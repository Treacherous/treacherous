"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_js_1 = require("event-js");
var property_changed_event_1 = require("../events/property-changed-event");
var ModelProxy = /** @class */ (function () {
    function ModelProxy() {
        var _this = this;
        this.proxyObject = function (model, ruleset) { return _this.walkModelAndProxy(model, null, ruleset); };
        this.createHandler = function (propertyRoute) {
            var propertyChangedRaiser = _this.onPropertyChanged;
            return {
                set: function (obj, prop, value) {
                    var currentValue = obj[prop];
                    if (currentValue !== value) {
                        Reflect.set(obj, prop, value);
                        var propertyChangedArgs_1 = new property_changed_event_1.PropertyChangedEvent(propertyRoute, value, currentValue);
                        setTimeout(function () { propertyChangedRaiser.publish(propertyChangedArgs_1); }, 1);
                    }
                    return true;
                },
                get: function (obj, prop) {
                    return Reflect.get(obj, prop);
                }
            };
        };
        this.proxyProperty = function (obj, propertyRoute) {
            return new Proxy(obj, _this.createHandler(propertyRoute));
        };
        this.walkModelAndProxy = function (parent, currentRoute, ruleset) {
            var paramRoute;
            var parameterRules;
            var _loop_1 = function (param) {
                paramRoute = currentRoute ? currentRoute + "." + param : param;
                parameterRules = ruleset.rules[param];
                var isArray = false;
                var isObject = false;
                parameterRules.forEach(function (rule) {
                    var nextProperty = parent[param];
                    isArray = rule.isForEach;
                    if (isArray) {
                        nextProperty.forEach(function (element, index) {
                            if (rule.internalRule.getRulesForProperty) {
                                nextProperty[index] = _this.walkModelAndProxy(element, paramRoute + "[" + index + "]", rule.internalRule);
                            }
                        });
                    }
                    else {
                        if (rule.getRulesForProperty) {
                            isObject = true;
                            parent[param] = _this.walkModelAndProxy(nextProperty, paramRoute, rule);
                        }
                    }
                });
                if (isArray || isObject) {
                    parent[param] = _this.proxyProperty(parent[param], paramRoute);
                }
            };
            for (var param in ruleset.rules) {
                _loop_1(param);
            }
            return _this.proxyProperty(parent, currentRoute);
        };
        this.onPropertyChanged = new event_js_1.EventHandler(this);
    }
    return ModelProxy;
}());
exports.ModelProxy = ModelProxy;
