import { RuleLink } from "../rulesets/rule-link";
import { ModelHelper } from "../model-helper";
export interface IFieldErrorProcessor {
    processRuleLink(mr: ModelHelper, propname: string, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(mr: ModelHelper, propname: string, rules: any): Promise<string>;
}
