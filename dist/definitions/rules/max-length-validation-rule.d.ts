import { IValidationRule } from "./ivalidation-rule";
export declare class MaxLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, maxLength: number): Promise<boolean>;
    getMessage(mr: any, prop: any, maxLength: any): string;
}
