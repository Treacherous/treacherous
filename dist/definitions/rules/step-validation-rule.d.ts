import { IValidationRule } from "./ivalidation-rule";
export declare class StepValidationRule implements IValidationRule {
    ruleName: string;
    validate(mr: any, prop: any, step: number): Promise<boolean>;
    getMessage(mr: any, prop: any, step: any): string;
}
