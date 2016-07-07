import { IValidationRule } from "./ivalidation-rule";
export declare class RegexValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, regexPattern: RegExp): Promise<boolean>;
    getMessage(value: any, regexPattern: any): string;
}
