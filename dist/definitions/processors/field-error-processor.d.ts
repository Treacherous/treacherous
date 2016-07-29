import { RuleRegistry } from "../rules/rule-registry";
import { RuleLink } from "../rulesets/rule-link";
import { IFieldErrorProcessor } from "./ifield-error-processor";
import { ModelHelper } from "../model-helper";
export declare class FieldErrorProcessor implements IFieldErrorProcessor {
    ruleRegistry: RuleRegistry;
    constructor(ruleRegistry: RuleRegistry);
    processRuleLink(modelHelper: ModelHelper, propertyName: string, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(modelHelper: ModelHelper, propertyName: string, rules: any): Promise<string>;
}
