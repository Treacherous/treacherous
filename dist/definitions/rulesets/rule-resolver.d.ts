import { IRuleResolver } from "./irule-resolver";
import { IPropertyResolver } from "property-resolver";
import { Ruleset } from "./ruleset";
export declare class RuleResolver implements IRuleResolver {
    private propertyResolver;
    constructor(propertyResolver?: IPropertyResolver);
    isPropertyRoute: (possiblePropertyRoute: string) => boolean;
    private isIndexRoute;
    resolvePropertyRules: (propertyRoute: string, ruleset: Ruleset) => any;
    private getMatchingRuleForProperty;
    private traverseRulesForRoutes;
}
