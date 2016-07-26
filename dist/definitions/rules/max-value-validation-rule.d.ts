import { IValidationRule } from "./ivalidation-rule";
export declare class MaxValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, maxValue: any): Promise<boolean>;
    getMessage(mr: any, prop: any, maxValue: any): string;
}
