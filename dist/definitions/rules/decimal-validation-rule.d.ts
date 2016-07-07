import { IValidationRule } from "./ivalidation-rule";
export declare class DecimalValidationRule implements IValidationRule {
    ruleName: string;
    private decimalRegex;
    validate(value: any): Promise<boolean>;
    getMessage(value: any): string;
}
