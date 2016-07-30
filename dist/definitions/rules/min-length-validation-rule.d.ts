import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class MinLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, minLength: any): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, minLength: any): string;
}
