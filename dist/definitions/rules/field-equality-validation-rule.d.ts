import { ModelHelper } from "../model-helper";
import { IValidationRule } from "./ivalidation-rule";
export declare class FieldEqualityValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): string;
}
