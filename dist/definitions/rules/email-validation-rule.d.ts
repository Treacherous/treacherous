import { IValidationRule } from "./ivalidation-rule";
export declare class EmailValidationRule implements IValidationRule {
    ruleName: string;
    private emailRegex;
    validate(mr: any, prop: any): Promise<boolean>;
    getMessage(mr: any, prop: any): string;
}
