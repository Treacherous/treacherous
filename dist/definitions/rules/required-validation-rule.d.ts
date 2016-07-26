import { IValidationRule } from "./ivalidation-rule";
export declare class RequiredValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, isRequired?: boolean): Promise<boolean>;
    getMessage(mr: any, prop: any, isRequired: any): string;
}
