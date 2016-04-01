import {IRuleResolver} from "./irule-resolver";
import {PropertyResolver} from "property-resolver";
import {Ruleset} from "./ruleset";

export class RuleResolver implements IRuleResolver
{
    constructor(private propertyResolver = new PropertyResolver())
    {}

    public isPropertyRoute = (possiblePropertyRoute: string) => {
        return possiblePropertyRoute.indexOf(".") >= 0;
    }

    private isIndexRoute = (possibleIndexRoute: string) => {
        return possibleIndexRoute.indexOf("[") >= 0;
    }

    public resolvePropertyRules = (propertyRoute: string, ruleset: Ruleset) => {
        var propertyRouteSections = this.propertyResolver.decomposePropertyRoute(propertyRoute);
        var finalProperty = propertyRouteSections[propertyRouteSections.length-1];

        var matchingRules = this.traverseRulesForRoutes(propertyRouteSections, ruleset);
        if(!matchingRules) { return null; }

        if(matchingRules.getRulesForProperty)
        {
            var outputRules = matchingRules.getRulesForProperty(finalProperty);
            return outputRules;
        }

        return matchingRules;
    }

    private getMatchingRuleForProperty = (property: string, rules: Array<any>) => {
        var currentRule;
        for(var i=0; i<rules.length; i++){
            currentRule = rules[i];
            if(currentRule.isForEach) { currentRule = currentRule.internalRule; }
            if(!currentRule.getRulesForProperty) { continue; }

            if(currentRule.rules[property]) {
                return currentRule;
            }
        }
    }

    private traverseRulesForRoutes = (propertyRouteSections: Array<string>, ruleset: any): any => {
        var currentProperty = propertyRouteSections.shift();

        var childRules = ruleset;
        if(ruleset.rules)
        { childRules = childRules.rules[currentProperty]; }

        if (!childRules)
        { return null; }

        if(propertyRouteSections.length == 0)
        { return childRules; }

        var nextProperty = propertyRouteSections[0];
        if(!nextProperty)
        { return ruleset; }

        if (this.isIndexRoute(nextProperty)) {
            propertyRouteSections.shift();

            var applicableRules = [];
            childRules.forEach((internalRules) => {
               if(internalRules.isForEach) {
                   applicableRules.push(internalRules.internalRule);
               }
            });

            if(propertyRouteSections.length > 0)
            {
                var totalRules = [];
                applicableRules.forEach((applicableRule) => {
                    var currentRouteSection = propertyRouteSections.slice();
                    var outputRules = this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                    outputRules.forEach((outputRule) => {
                        totalRules.push(outputRule);
                    });
                });
                return totalRules;
            }
            return applicableRules;
        }

        if(propertyRouteSections.length == 0)
        { return childRules; }

        var nextChildRule = this.getMatchingRuleForProperty(nextProperty, childRules);

        if(propertyRouteSections.length > 0)
        { return this.traverseRulesForRoutes(propertyRouteSections, nextChildRule); }

        return nextChildRule;
    }
}