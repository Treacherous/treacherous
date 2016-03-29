import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class MinLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, minLength: number): Promise<boolean>;
    getMessage(value: any, minLength: number): string;
}
