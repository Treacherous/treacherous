import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class RegexValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, regexPattern: RegExp): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, regexPattern: any): string;
}
