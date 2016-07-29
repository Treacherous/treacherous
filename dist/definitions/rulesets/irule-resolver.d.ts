import { Ruleset } from "./ruleset";
export interface IRuleResolver {
    resolvePropertyRules(propertyRouteSections: Array<string>, ruleset: Ruleset): any;
}
