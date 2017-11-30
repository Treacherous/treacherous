import {IModelResolver} from "../resolvers/imodel-resolver";

export type RawLocaleStringGetter = (modelResolver: IModelResolver, propertyName: string, options?: any) => string;
export type ProcessedLocaleStringGetter = (propertyValue: any, options?: any) => string;
export type LocaleString = string | RawLocaleStringGetter | ProcessedLocaleStringGetter;