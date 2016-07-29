import { ModelHelper } from "../model-helper";
import { IValidationRule } from "./ivalidation-rule";
export declare class ISODateValidationRule implements IValidationRule {
    ruleName: string;
    private isoDateRegex;
    validate(modelHelper: ModelHelper, propertyName: string): Promise<boolean>;
    getMessage(modelHelper: ModelHelper, propertyName: string): string;
}
