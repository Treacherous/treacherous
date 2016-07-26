import { IValidationRule } from "./ivalidation-rule";
export declare class ISODateValidationRule implements IValidationRule {
    ruleName: string;
    private isoDateRegex;
    validate(mr: any, prop: any): Promise<boolean>;
    getMessage(mr: any, prop: any): string;
}
