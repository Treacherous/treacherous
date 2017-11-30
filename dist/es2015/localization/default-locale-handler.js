import * as tslib_1 from "tslib";
export class DefaultLocaleHandler {
    constructor() {
        this.localeResources = {};
        this.getCurrentLocale = () => { return this.localeCode; };
        this.registerLocale = (localeCode, localeResource) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.localeCode = localeCode;
            this.localeResources[this.localeCode] = localeResource;
        });
        this.useLocale = (localeCode) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.localeResources[localeCode]) {
                throw `Unable to find registered locale for [${localeCode}]`;
            }
            this.localeCode = localeCode;
        });
        this.supplementLocaleFrom = (localeCode, localeModule) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.localeResources[localeCode]) {
                this.localeResources[localeCode] = {};
            }
            for (const propertyName in localeModule) {
                this.localeResources[localeCode][propertyName] = localeModule[propertyName];
            }
        });
        this.getMessage = (ruleName, ruleOptions, modelResolver, propertyName) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currentLocale = this.localeResources[this.localeCode];
            const ruleResource = currentLocale[ruleName] || currentLocale["default"] || `Cannot find rule for ${ruleName}`;
            if (typeof ruleResource === "string") {
                return ruleResource;
            }
            if (ruleResource.length === 3 || propertyName == null) {
                return ruleResource(modelResolver, propertyName, ruleOptions);
            }
            const propertyValue = modelResolver.resolve(propertyName);
            return ruleResource(propertyValue, ruleOptions);
        });
    }
}
