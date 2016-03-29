import { IValidationRule } from "./ivalidation-rule";
export declare class RuleRegistry {
    rules: {};
    registerRule: (validationRule: IValidationRule) => void;
    unregisterRule: (validationRule: IValidationRule) => void;
    getRuleNamed: (ruleName: string) => IValidationRule;
}
