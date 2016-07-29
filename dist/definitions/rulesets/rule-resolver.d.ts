import { IRuleResolver } from "./irule-resolver";
import { Ruleset } from "./ruleset";
export declare class RuleResolver implements IRuleResolver {
    isPropertyRoute: (possiblePropertyRoute: string) => boolean;
    private isIndexRoute;
    resolvePropertyRules: (propertyRouteSections: string[], ruleset: Ruleset) => any;
    private getMatchingRuleForProperty;
    private traverseRulesForRoutes;
}
