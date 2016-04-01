import { Ruleset } from "./ruleset";
export interface IRuleResolver {
    resolvePropertyRules(propertyRoute: string, ruleset: Ruleset): any;
}
