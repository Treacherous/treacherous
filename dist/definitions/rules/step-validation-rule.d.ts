import { IValidationRule } from "./ivalidation-rule";
import { ModelHelper } from "../model-helper";
export declare class StepValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelHelper: ModelHelper, propertyName: string, step: number): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string, step: any): string;
}
