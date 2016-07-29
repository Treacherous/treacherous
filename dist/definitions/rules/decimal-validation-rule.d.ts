import { ModelHelper } from "../model-helper";
import { IValidationRule } from "./ivalidation-rule";
export declare class DecimalValidationRule implements IValidationRule {
    ruleName: string;
    private decimalRegex;
    validate(modelHelper: ModelHelper, propertyName: string): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string): string;
}
