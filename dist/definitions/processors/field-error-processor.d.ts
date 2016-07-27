import { RuleRegistry } from "../rules/rule-registry";
import { RuleLink } from "../rulesets/rule-link";
import { IFieldErrorProcessor } from "./ifield-error-processor";
import { ModelResolver } from "../model-resolver";
export declare class FieldErrorProcessor implements IFieldErrorProcessor {
    ruleRegistry: RuleRegistry;
    constructor(ruleRegistry: RuleRegistry);
    processRuleLink(mr: ModelResolver, propname: any, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(mr: ModelResolver, propname: any, rules: any): Promise<string>;
}
