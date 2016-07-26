import { IValidationRule } from "./ivalidation-rule";
export declare class RegexValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, regexPattern: RegExp): Promise<boolean>;
    getMessage(mr: any, prop: any, regexPattern: any): string;
}
