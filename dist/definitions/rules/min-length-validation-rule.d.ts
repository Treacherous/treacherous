import { IValidationRule } from "./ivalidation-rule";
export declare class MinLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, minLength: any): Promise<boolean>;
    getMessage(mr: any, prop: any, minLength: any): string;
}
