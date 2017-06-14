"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var property_resolver_1 = require("property-resolver");
var RuleResolver = (function () {
    function RuleResolver(propertyResolver) {
        if (propertyResolver === void 0) { propertyResolver = new property_resolver_1.PropertyResolver(); }
        var _this = this;
        this.propertyResolver = propertyResolver;
        this.isPropertyRoute = function (possiblePropertyRoute) {
            return possiblePropertyRoute.indexOf(".") >= 0;
        };
        this.isIndexRoute = function (possibleIndexRoute) {
            return possibleIndexRoute.indexOf("[") >= 0;
        };
        this.resolvePropertyRules = function (propertyRoute, ruleset) {
            var propertyRouteSections = _this.propertyResolver.decomposePropertyRoute(propertyRoute);
            var finalProperty = propertyRouteSections[propertyRouteSections.length - 1];
            var matchingRules = _this.traverseRulesForRoutes(propertyRouteSections, ruleset);
            if (!matchingRules) {
                return null;
            }
            if (matchingRules.getRulesForProperty) {
                return matchingRules.getRulesForProperty(finalProperty);
            }
            return matchingRules;
        };
        this.getMatchingRuleForProperty = function (property, rules) {
            var currentRule;
            for (var i = 0; i < rules.length; i++) {
                currentRule = rules[i];
                if (currentRule.isForEach) {
                    currentRule = currentRule.internalRule;
                }
                if (!currentRule.getRulesForProperty) {
                    continue;
                }
                if (currentRule.rules[property]) {
                    return currentRule;
                }
            }
        };
        this.traverseRulesForRoutes = function (propertyRouteSections, ruleset) {
            var currentProperty = propertyRouteSections.shift();
            var childRules = ruleset;
            if (ruleset.rules) {
                childRules = childRules.rules[currentProperty];
            }
            if (!childRules) {
                return null;
            }
            if (propertyRouteSections.length == 0) {
                return childRules;
            }
            var nextProperty = propertyRouteSections[0];
            if (!nextProperty) {
                return ruleset;
            }
            if (_this.isIndexRoute(nextProperty)) {
                propertyRouteSections.shift();
                var applicableRules_1 = [];
                childRules.forEach(function (internalRules) {
                    if (internalRules.isForEach) {
                        applicableRules_1.push(internalRules.internalRule);
                    }
                });
                if (propertyRouteSections.length > 0) {
                    var totalRules_1 = [];
                    applicableRules_1.forEach(function (applicableRule) {
                        var currentRouteSection = propertyRouteSections.slice();
                        var outputRules = _this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                        outputRules.forEach(function (outputRule) {
                            totalRules_1.push(outputRule);
                        });
                    });
                    return totalRules_1;
                }
                return applicableRules_1;
            }
            if (propertyRouteSections.length == 0) {
                return childRules;
            }
            var nextChildRule = _this.getMatchingRuleForProperty(nextProperty, childRules);
            if (propertyRouteSections.length > 0) {
                return _this.traverseRulesForRoutes(propertyRouteSections, nextChildRule);
            }
            return nextChildRule;
        };
    }
    return RuleResolver;
}());
exports.RuleResolver = RuleResolver;
