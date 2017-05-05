import { PropertyResolver } from "property-resolver";
export class RuleResolver {
    constructor(propertyResolver = new PropertyResolver()) {
        this.propertyResolver = propertyResolver;
        this.isPropertyRoute = (possiblePropertyRoute) => {
            return possiblePropertyRoute.indexOf(".") >= 0;
        };
        this.isIndexRoute = (possibleIndexRoute) => {
            return possibleIndexRoute.indexOf("[") >= 0;
        };
        this.resolvePropertyRules = (propertyRoute, ruleset) => {
            let propertyRouteSections = this.propertyResolver.decomposePropertyRoute(propertyRoute);
            let finalProperty = propertyRouteSections[propertyRouteSections.length - 1];
            let matchingRules = this.traverseRulesForRoutes(propertyRouteSections, ruleset);
            if (!matchingRules) {
                return null;
            }
            if (matchingRules.getRulesForProperty) {
                return matchingRules.getRulesForProperty(finalProperty);
            }
            return matchingRules;
        };
        this.getMatchingRuleForProperty = (property, rules) => {
            let currentRule;
            for (let i = 0; i < rules.length; i++) {
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
        this.traverseRulesForRoutes = (propertyRouteSections, ruleset) => {
            let currentProperty = propertyRouteSections.shift();
            let childRules = ruleset;
            if (ruleset.rules) {
                childRules = childRules.rules[currentProperty];
            }
            if (!childRules) {
                return null;
            }
            if (propertyRouteSections.length == 0) {
                return childRules;
            }
            let nextProperty = propertyRouteSections[0];
            if (!nextProperty) {
                return ruleset;
            }
            if (this.isIndexRoute(nextProperty)) {
                propertyRouteSections.shift();
                let applicableRules = [];
                childRules.forEach((internalRules) => {
                    if (internalRules.isForEach) {
                        applicableRules.push(internalRules.internalRule);
                    }
                });
                if (propertyRouteSections.length > 0) {
                    let totalRules = [];
                    applicableRules.forEach((applicableRule) => {
                        let currentRouteSection = propertyRouteSections.slice();
                        let outputRules = this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                        outputRules.forEach((outputRule) => {
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
            let nextChildRule = this.getMatchingRuleForProperty(nextProperty, childRules);
            if (propertyRouteSections.length > 0) {
                return this.traverseRulesForRoutes(propertyRouteSections, nextChildRule);
            }
            return nextChildRule;
        };
    }
}
