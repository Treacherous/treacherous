import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class MinValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, minValue: any): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, minValue: any): string;
}
