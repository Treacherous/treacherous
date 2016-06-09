import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class StepValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, step: number): Promise<boolean>;
    getMessage(value: any, step: any): string;
}
