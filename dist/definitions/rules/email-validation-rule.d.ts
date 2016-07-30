import { ModelHelper } from "../model-helper";
import { IValidationRule } from "./ivalidation-rule";
export declare class EmailValidationRule implements IValidationRule {
    ruleName: string;
    private emailRegex;
    validate(modelHelper: ModelHelper, propertyName: string): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string): string;
}
