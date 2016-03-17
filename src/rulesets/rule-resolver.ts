import {PropertyResolver} from "property-resolver";
import {Ruleset} from "./ruleset";

export class RuleResolver
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
        if (propertyRouteSections.length == 1) { return ruleset.getRulesForProperty(propertyRoute); }

        var currentDepth = 0;
        var currentRuleset: any = ruleset;
        while (currentDepth < (propertyRouteSections.length - 1)) {
            if (currentRuleset.isForEach)
            { currentRuleset = currentRuleset.internalRule; }

            if (!currentRuleset.rules.hasOwnProperty(propertyRouteSections[currentDepth]))
            { return null; }

            var matchingRules = currentRuleset.rules[propertyRouteSections[currentDepth++]];

            if (this.isIndexRoute(propertyRouteSections[currentDepth]))
            {
                if(currentDepth == propertyRouteSections.length-1)
                { return matchingRules; }

                currentDepth++;
            }

            var matchedRule = null;
            matchingRules.forEach((rule) => {
                var currentRule = rule;
                if(rule.isForEach) { currentRule = rule.internalRule; }
                if(!currentRule.getRulesForProperty) { return;	}

                if(currentRule.rules.hasOwnProperty(propertyRouteSections[currentDepth]))
                {
                    matchedRule = currentRule;
                    return;
                }
            });

            if(!matchedRule) { return null; }
            currentRuleset = matchedRule;
        }

        return currentRuleset.getRulesForProperty(propertyRouteSections[currentDepth]);
    }
}