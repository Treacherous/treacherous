import { IValidationRule } from "./ivalidation-rule";
export declare class AdvancedRegexValidationRule implements IValidationRule {
    ruleName: string;
    expression: string;
    message: (value) => string;
    constructor(ruleName: string, expression: string, message: string | ((value) => string));
    validate(value: any, regexPattern: RegExp): Promise<boolean>;
    getMessage(value: any, regexPattern: any): string;
}
