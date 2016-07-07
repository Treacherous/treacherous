import { IValidationRule } from "./ivalidation-rule";
export declare class NumberValidationRule implements IValidationRule {
    ruleName: string;
    private numberRegex;
    validate(value: any): Promise<boolean>;
    getMessage(value: any): string;
}
