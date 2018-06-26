import {IDisplayNameCache} from "./idisplay-name-cache";
import {Ruleset} from "../rulesets/ruleset";
import {TypeHelper} from "../helpers/type-helper";

export class DisplayNameCache implements IDisplayNameCache
{
    protected propertySanitizerRegex = /\[(.*?)]/g;
    protected propertyNameOverrideCache: any = {};

    protected recurseTree = (ruleset: Ruleset, currentPropertyRoute: string) => {
        for (const propertyKey in ruleset.rules){
            const nextRoute = this.updateRouteName(currentPropertyRoute, propertyKey);
            const appliedRules = ruleset.rules[propertyKey];

            appliedRules.forEach((ruleOrSet: any) => {
                if(TypeHelper.isForEach(ruleOrSet) && TypeHelper.isRuleset(ruleOrSet.internalRule))
                { this.recurseTree(ruleOrSet.internalRule, nextRoute); }

                if(TypeHelper.isRuleset(ruleOrSet))
                { this.recurseTree(ruleOrSet, nextRoute); }
            });
        }

        if(Object.keys(ruleset.propertyDisplayNames).length == 0)
        { return; }

        for(const propertyKey in ruleset.propertyDisplayNames)
        {
            const routeName = this.updateRouteName(currentPropertyRoute, propertyKey);
            this.propertyNameOverrideCache[routeName] = ruleset.propertyDisplayNames[propertyKey];
        }
    };

    protected updateRouteName = (currentRoute: string, nextPart: string) => {
        return currentRoute.length > 0 ? `${currentRoute}.${nextPart}`: nextPart;
    };

    public cacheDisplayNamesFor = (rootRuleset: Ruleset) => {
        this.recurseTree(rootRuleset, "");
    };

    public getDisplayNameFor = (propertyRoute: string): string => {
        const sanitisedDisplayName = propertyRoute.replace(this.propertySanitizerRegex, "");
        console.log(sanitisedDisplayName);
        return this.propertyNameOverrideCache[sanitisedDisplayName] || propertyRoute;
    };
}