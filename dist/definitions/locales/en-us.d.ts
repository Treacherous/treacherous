import { IModelResolver } from "../resolvers/imodel-resolver";
export declare const locale: {
    "default": string;
    "required": string;
    "date": (value: any) => string;
    "decimal": (value: any) => string;
    "equal": (value: any, optionsOrValue: any) => string;
    "notEqual": (value: any, optionsOrValue: any) => string;
    "isoDate": (value: any) => string;
    "maxLength": (value: any, maxLength: number) => string;
    "minLength": (value: any, minLength: number) => string;
    "maxValue": (value: any, maxValue: number) => string;
    "minValue": (value: any, minValue: number) => string;
    "number": (value: any) => string;
    "regex": string;
    "step": (value: any, step: number) => string;
    "matches": (modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any) => string;
};
