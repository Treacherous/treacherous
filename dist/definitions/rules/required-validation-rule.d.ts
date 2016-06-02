import { IValidationRule } from "./ivalidation-rule";
export declare class RequiredValidaitonRule implements IValidationRule {
    ruleName: string;
    validate(value: any, isRequired?: boolean): Promise<boolean>;
    getMessage(value: any, isRequired: any): string;
}
