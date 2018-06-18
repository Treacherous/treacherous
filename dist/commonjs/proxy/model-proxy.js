"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var event_js_1 = require("event-js");
var property_changed_event_1 = require("../events/property-changed-event");
var ModelProxy = /** @class */ (function () {
    function ModelProxy() {
        var _this = this;
        this.proxyObject = function (model, ruleset) { _this.walkModelAndProxy(model, null, ruleset); };
        this.createHandler = function (propertyRoute) {
            var propertyChangedRaiser = _this.onPropertyChanged;
            return {
                set: function (obj, prop, value) {
                    if (obj[prop] !== value) {
                        var oldValue = obj[prop];
                        obj[prop] = value;
                        var propertyChangedArgs_1 = new property_changed_event_1.PropertyChangedEvent(propertyRoute, value, oldValue);
                        setTimeout(function () { propertyChangedRaiser.publish(propertyChangedArgs_1); }, 1);
                    }
                }
            };
        };
        this.proxyProperty = function (parent, prop, propertyRoute) {
            parent[prop] = new Proxy(parent[prop], _this.createHandler(propertyRoute));
        };
        this.walkModelAndProxy = function (parent, currentRoute, ruleset) {
            var paramRoute;
            var parameterRules;
            var anyRulesAreForEach;
            var anyRulesAreSets;
            var _loop_1 = function (param) {
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
                parameterRules.forEach(function (rule) {
                    var nextProperty = parent[param];
                    var isArray = rule.isForEach;
                    if (isArray) {
                        nextProperty.forEach(function (element, index) {
                            if (rule.internalRule.getRulesForProperty) {
                                _this.walkModelAndProxy(element, paramRoute + "[" + index + "]", rule.internalRule);
                            }
                            else {
                                _this.proxyProperty(nextProperty, paramRoute + "[" + index + "]", index);
                            }
                        });
                        _this.proxyProperty(parent, paramRoute, param);
                    }
                    else {
                        if (rule.internalRule.getRulesForProperty) {
                            _this.walkModelAndProxy(nextProperty, paramRoute, rule.internalRule);
                        }
                        else {
                            _this.proxyProperty(parent, paramRoute, param);
                        }
                    }
                });
            };
            for (var param in ruleset.rules) {
                _loop_1(param);
            }
        };
        this.onPropertyChanged = new event_js_1.EventHandler(this);
    }
    return ModelProxy;
}());
exports.ModelProxy = ModelProxy;
