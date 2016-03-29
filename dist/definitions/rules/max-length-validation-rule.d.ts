import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class MaxLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, maxLength: number): Promise<boolean>;
    getMessage(value: any, maxLength: any): string;
}
