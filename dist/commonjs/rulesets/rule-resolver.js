"use strict";
var RuleResolver = (function () {
    function RuleResolver() {
        var _this = this;
        this.isPropertyRoute = function (possiblePropertyRoute) {
            return possiblePropertyRoute.indexOf(".") >= 0;
        };
        this.isIndexRoute = function (possibleIndexRoute) {
            return possibleIndexRoute.indexOf("[") >= 0;
        };
        this.resolvePropertyRules = function (propertyRouteSections, ruleset) {
            var finalProperty = propertyRouteSections[propertyRouteSections.length - 1];
            var matchingRules = _this.traverseRulesForRoutes(propertyRouteSections, ruleset);
            if (!matchingRules) {
                return null;
            }
            if (matchingRules.getRulesForProperty) {
                var outputRules = matchingRules.getRulesForProperty(finalProperty);
                return outputRules;
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
                var applicableRules = [];
                childRules.forEach(function (internalRules) {
                    if (internalRules.isForEach) {
                        applicableRules.push(internalRules.internalRule);
                    }
                });
                if (propertyRouteSections.length > 0) {
                    var totalRules = [];
                    applicableRules.forEach(function (applicableRule) {
                        var currentRouteSection = propertyRouteSections.slice();
                        var outputRules = _this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                        outputRules.forEach(function (outputRule) {
                            totalRules.push(outputRule);
                        });
                    });
                    return totalRules;
                }
                return applicableRules;
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
