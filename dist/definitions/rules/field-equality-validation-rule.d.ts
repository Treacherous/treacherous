import { IValidationRule } from "./ivalidation-rule";
export declare class FieldEqualityValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, optionsOrValue: any): Promise<boolean>;
    getMessage(mr: any, prop: any, optionsOrValue: any): string;
}
