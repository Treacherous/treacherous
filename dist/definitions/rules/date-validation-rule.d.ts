import { IValidationRule } from "./ivalidation-rule";
export declare class DateValidationRule implements IValidationRule {
    ruleName: string;
    private invalidObjectRegex;
    validate(mr: any, prop: any): Promise<boolean>;
    getMessage(mr: any, prop: any): string;
}
