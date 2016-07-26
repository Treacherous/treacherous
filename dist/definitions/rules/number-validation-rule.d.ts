import { IValidationRule } from "./ivalidation-rule";
export declare class NumberValidationRule implements IValidationRule {
    ruleName: string;
    private numberRegex;
    validate(mr: any, prop: any): Promise<boolean>;
    getMessage(mr: any, prop: any): string;
}
