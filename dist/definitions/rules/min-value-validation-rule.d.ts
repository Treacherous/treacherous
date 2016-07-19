import { IValidationRule } from "./ivalidation-rule";
export declare class MinValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, minValue: any): Promise<boolean>;
    getMessage(value: any, minValue: any): string;
}
