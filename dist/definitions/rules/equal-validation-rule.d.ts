import { ModelHelper } from "../model-helper";
import { IValidationRule } from "./ivalidation-rule";
export declare class EqualValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, optionsOrValue: any): string;
}
