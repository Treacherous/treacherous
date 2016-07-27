import { RuleLink } from "../rulesets/rule-link";
import { ModelResolver } from "../model-resolver";
export interface IFieldErrorProcessor {
    processRuleLink(mr: ModelResolver, propname: string, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(mr: ModelResolver, propname: string, rules: any): Promise<string>;
}
