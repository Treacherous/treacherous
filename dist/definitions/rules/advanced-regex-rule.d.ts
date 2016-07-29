import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class AdvancedRegexValidationRule implements IValidationRule {
    ruleName: string;
    expression: string;
    message: (value) => string;
    constructor(ruleName: string, expression: string, message: string | ((value) => string));
    validate(modelHelper: ModelHelper, propertyName: string, regexPattern: RegExp): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, regexPattern: any): string;
}
