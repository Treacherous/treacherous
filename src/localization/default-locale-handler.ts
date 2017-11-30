import {ILocaleHandler} from "./ilocale-handler";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {RuleLink} from "../rulesets/rule-link";
import {LocaleString, RawLocaleStringGetter, ProcessedLocaleStringGetter} from './locale-string';

export class DefaultLocaleHandler implements ILocaleHandler
{
    private localeCode: string;
    private localeResources: any = {};

    public getCurrentLocale = () => { return this.localeCode; };

    public registerLocale = async(localeCode: string, localeResource: any) =>
    { 
        this.localeCode = localeCode;
        this.localeResources[this.localeCode] = localeResource;
    }

    public useLocale = async(localeCode: string) =>
    { 
        if(!this.localeResources[localeCode])
        { throw `Unable to find registered locale for [${localeCode}]`; }

        this.localeCode = localeCode;
    }

    public supplementLocaleFrom = async (localeCode: string, localeModule: any) => {
        if(!this.localeResources[localeCode])
        { this.localeResources[localeCode] = {}; }

        for(const propertyName in localeModule) {
            this.localeResources[localeCode][propertyName] = localeModule[propertyName];
        } 
    }
    
    public getMessage = async (ruleName: string, ruleOptions: any, modelResolver: IModelResolver, propertyName: string) => {
        const currentLocale = this.localeResources[this.localeCode];
        const ruleResource: LocaleString = currentLocale[ruleName] || currentLocale["default"] || `Cannot find rule for ${ruleName}`;

        if(typeof ruleResource === "string")
        { return ruleResource; }

        if(ruleResource.length === 3 || propertyName == null)
        { return (<RawLocaleStringGetter>ruleResource)(modelResolver, propertyName, ruleOptions); }

        const propertyValue = modelResolver.resolve(propertyName);
        return (<ProcessedLocaleStringGetter>ruleResource)(propertyValue, ruleOptions);
    }
}