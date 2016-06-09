import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class EmailValidationRule implements IValidationRule {
    ruleName: string;
    private emailRegex;
    validate(value: any): Promise<boolean>;
    getMessage(value: any): string;
}
