import { IValidationRule } from "./ivalidation-rule";
export declare class AdvancedRegexValidationRule implements IValidationRule {
    ruleName: string;
    expression: string;
    message: (value) => string;
    constructor(ruleName: string, expression: string, message: string | ((value) => string));
    validate(mr: any, prop: any, regexPattern: RegExp): Promise<boolean>;
    getMessage(mr: any, prop: any, regexPattern: any): string;
}
