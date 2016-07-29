import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class NotEqualValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): string;
}
