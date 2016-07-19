import { IValidationRule } from "./ivalidation-rule";
export declare class MaxValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, maxValue: any): Promise<boolean>;
    getMessage(value: any, maxValue: any): string;
}
