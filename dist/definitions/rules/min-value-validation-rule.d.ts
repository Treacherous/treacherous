import { IValidationRule } from "./ivalidation-rule";
export declare class MinValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, minValue: any): Promise<boolean>;
    getMessage(mr: any, prop: any, minValue: any): string;
}
