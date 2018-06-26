import { TypeHelper } from "../helpers/type-helper";
export class DisplayNameCache {
    constructor() {
        this.propertySanitizerRegex = /\[(.*?)]/g;
        this.propertyNameOverrideCache = {};
        this.recurseTree = (ruleset, currentPropertyRoute) => {
            for (const propertyKey in ruleset.rules) {
                const nextRoute = this.updateRouteName(currentPropertyRoute, propertyKey);
                const appliedRules = ruleset.rules[propertyKey];
                appliedRules.forEach((ruleOrSet) => {
                    if (TypeHelper.isForEach(ruleOrSet) && TypeHelper.isRuleset(ruleOrSet.internalRule)) {
                        this.recurseTree(ruleOrSet.internalRule, nextRoute);
                    }
                    if (TypeHelper.isRuleset(ruleOrSet)) {
                        this.recurseTree(ruleOrSet, nextRoute);
                    }
                });
            }
            if (Object.keys(ruleset.propertyDisplayNames).length == 0) {
                return;
            }
            for (const propertyKey in ruleset.propertyDisplayNames) {
                const routeName = this.updateRouteName(currentPropertyRoute, propertyKey);
                this.propertyNameOverrideCache[routeName] = ruleset.propertyDisplayNames[propertyKey];
            }
        };
        this.updateRouteName = (currentRoute, nextPart) => {
            return currentRoute.length > 0 ? `${currentRoute}.${nextPart}` : nextPart;
        };
        this.cacheDisplayNamesFor = (rootRuleset) => {
            this.recurseTree(rootRuleset, "");
        };
        this.getDisplayNameFor = (propertyRoute) => {
            const sanitisedDisplayName = propertyRoute.replace(this.propertySanitizerRegex, "");
            return this.propertyNameOverrideCache[sanitisedDisplayName] || propertyRoute;
        };
    }
}
