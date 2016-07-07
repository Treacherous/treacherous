import { IValidationRule } from "./ivalidation-rule";
export declare class MaxValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, maxValue: number | Date): Promise<boolean>;
    getMessage(value: any, maxValue: any): string;
}
