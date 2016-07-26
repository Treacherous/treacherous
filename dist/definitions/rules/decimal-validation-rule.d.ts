import { IValidationRule } from "./ivalidation-rule";
export declare class DecimalValidationRule implements IValidationRule {
    ruleName: string;
    private decimalRegex;
    validate(mr: any, prop: any): Promise<boolean>;
    getMessage(mr: any, prop: any): string;
}
