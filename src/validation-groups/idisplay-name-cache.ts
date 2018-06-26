import {Ruleset} from "../rulesets/ruleset";

export interface IDisplayNameCache
{
    cacheDisplayNamesFor(rootRuleset: Ruleset): void;
    getDisplayNameFor(propertyRoute: string): string;
}