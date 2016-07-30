import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class MaxLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, maxLength: number): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, maxLength: any): string;
}
