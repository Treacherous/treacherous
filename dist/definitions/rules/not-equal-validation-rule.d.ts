import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class NotEqualValidationRule implements IValidationRule {
    ruleName: string;
    validate(value: any, optionsOrValue: any): Promise<boolean>;
    getMessage(value: any, optionsOrValue: any): string;
}
