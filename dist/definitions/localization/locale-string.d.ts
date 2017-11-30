import { IModelResolver } from "../resolvers/imodel-resolver";
export declare type RawLocaleStringGetter = (modelResolver: IModelResolver, propertyName: string, options?: any) => string;
export declare type ProcessedLocaleStringGetter = (propertyValue: any, options?: any) => string;
export declare type LocaleString = string | RawLocaleStringGetter | ProcessedLocaleStringGetter;
