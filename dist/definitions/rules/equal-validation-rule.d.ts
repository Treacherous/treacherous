import { IValidationRule } from "./ivalidation-rule";
export declare class EqualValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, optionsOrValue: any): Promise<boolean>;
    getMessage(value: any, optionsOrValue: any): string;
}
