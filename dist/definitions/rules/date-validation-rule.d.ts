import * as Promise from "bluebird";
import { IValidationRule } from "./ivalidation-rule";
export declare class DateValidationRule implements IValidationRule {
    ruleName: string;
    private invalidObjectRegex;
    validate(value: any): Promise<boolean>;
    getMessage(value: any): string;
}
