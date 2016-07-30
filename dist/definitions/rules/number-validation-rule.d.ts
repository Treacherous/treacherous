import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class NumberValidationRule implements IValidationRule {
    ruleName: string;
    private numberRegex;
    validate(modelHelper: ModelHelper, propertyName: string): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string): string;
}
