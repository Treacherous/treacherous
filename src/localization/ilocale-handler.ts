import {IModelResolver} from "../resolvers/imodel-resolver";
import {RuleLink} from "../rulesets/rule-link";

export interface ILocaleHandler
{
    getCurrentLocale(): string;
    registerLocale(localeCode: string, localeDataOrOptions: any): Promise<void>;
    useLocale(localeCode: string): Promise<void>;
    getMessage(ruleName: string, ruleOptions: any, modelResolver: IModelResolver, propertyName: string) : Promise<string>;
}