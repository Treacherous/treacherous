import { ILocaleHandler } from "./ilocale-handler";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class DefaultLocaleHandler implements ILocaleHandler {
    private localeCode;
    private localeResources;
    getCurrentLocale: () => string;
    registerLocale: (localeCode: string, localeResource: any) => Promise<void>;
    useLocale: (localeCode: string) => Promise<void>;
    supplementLocaleFrom: (localeCode: string, localeModule: any) => Promise<void>;
    getMessage: (ruleName: string, ruleOptions: any, modelResolver: IModelResolver, propertyName: string) => Promise<string>;
}
