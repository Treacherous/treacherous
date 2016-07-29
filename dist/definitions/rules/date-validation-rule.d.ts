import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class DateValidationRule implements IValidationRule {
    ruleName: string;
    private invalidObjectRegex;
    validate(modelHelper: ModelHelper, propertyName: string): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string): string;
}
