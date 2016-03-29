import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class MinValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, minValue: number): Promise<boolean>;
    getMessage(value: any, minValue: number): string;
}
