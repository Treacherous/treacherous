import { IValidationRule } from "./ivalidation-rule";
export declare class RuleRegistry {
    rules: any;
    registerRule: (validationRule: IValidationRule) => void;
    unregisterRule: (validationRule: IValidationRule) => void;
    getRuleNamed: (ruleName: string) => IValidationRule;
    hasRuleNamed: (ruleName: string) => boolean;
}
