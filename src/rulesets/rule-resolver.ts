import {IRuleResolver} from "./irule-resolver";
import {IPropertyResolver, PropertyResolver} from "property-resolver";
import {Ruleset} from "./ruleset";

export class RuleResolver implements IRuleResolver
{
    constructor(private propertyResolver: IPropertyResolver = new PropertyResolver())
    {}

    public isPropertyRoute = (possiblePropertyRoute: string) => {
        return possiblePropertyRoute.indexOf(".") >= 0;
    }

    private isIndexRoute = (possibleIndexRoute: string) => {
        return possibleIndexRoute.indexOf("[") >= 0;
    }

    public resolvePropertyRules = (propertyRoute: string, ruleset: Ruleset) => {
        const propertyRouteSections = this.propertyResolver.decomposePropertyRoute(propertyRoute);
        const finalProperty = propertyRouteSections[propertyRouteSections.length-1];

        const matchingRules = this.traverseRulesForRoutes(propertyRouteSections, ruleset);
        if(!matchingRules) { return null; }

        if(matchingRules.getRulesForProperty)
        { return matchingRules.getRulesForProperty(finalProperty); }

        return matchingRules;
    }

    private getMatchingRuleForProperty = (property: string, rules: Array<any>) => {
        let currentRule;
        for(let i=0; i<rules.length; i++){
            currentRule = rules[i];
            if(currentRule.isForEach) { currentRule = currentRule.internalRule; }
            if(!currentRule.getRulesForProperty) { continue; }

            if(currentRule.rules[property]) {
                return currentRule;
            }
        }
    }

    private traverseRulesForRoutes = (propertyRouteSections: Array<string>, ruleset: any): any => {
        const currentProperty = propertyRouteSections.shift();

        let childRules = ruleset;
        if(ruleset.rules)
        { childRules = childRules.rules[currentProperty]; }

        if (!childRules)
        { return null; }

        if(propertyRouteSections.length == 0)
        { return childRules; }

        const nextProperty = propertyRouteSections[0];
        if(!nextProperty)
        { return ruleset; }

        if (this.isIndexRoute(nextProperty)) {
            propertyRouteSections.shift();

            const applicableRules: Array<any> = [];
            childRules.forEach((internalRules: any) => {
               if(internalRules.isForEach) {
                   applicableRules.push(internalRules.internalRule);
               }
            });

            if(propertyRouteSections.length > 0)
            {
                const totalRules: Array<any> = [];
                applicableRules.forEach((applicableRule: any) => {
                    const currentRouteSection = propertyRouteSections.slice();
                    const outputRules = this.traverseRulesForRoutes(currentRouteSection, applicableRule);
                    outputRules.forEach((outputRule: any) => {
                        totalRules.push(outputRule);
                    });
                });
                return totalRules;
            }
            return applicableRules;
        }

        if(propertyRouteSections.length == 0)
        { return childRules; }

        const nextChildRule = this.getMatchingRuleForProperty(nextProperty, childRules);

        if(propertyRouteSections.length > 0)
        { return this.traverseRulesForRoutes(propertyRouteSections, nextChildRule); }

        return nextChildRule;
    }
}