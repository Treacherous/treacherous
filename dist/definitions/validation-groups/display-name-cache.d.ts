import { IDisplayNameCache } from "./idisplay-name-cache";
import { Ruleset } from "../rulesets/ruleset";
export declare class DisplayNameCache implements IDisplayNameCache {
    protected propertySanitizerRegex: RegExp;
    protected propertyNameOverrideCache: any;
    protected recurseTree: (ruleset: Ruleset, currentPropertyRoute: string) => void;
    protected updateRouteName: (currentRoute: string, nextPart: string) => string;
    cacheDisplayNamesFor: (rootRuleset: Ruleset) => void;
    getDisplayNameFor: (propertyRoute: string) => string;
}
