import { IValidationRule } from "./ivalidation-rule";
export declare class ISODateValidationRule implements IValidationRule {
    ruleName: string;
    private isoDateRegex;
    validate(value: any): Promise<boolean>;
    getMessage(value: any): string;
}
