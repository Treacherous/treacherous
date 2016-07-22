import {RuleLink} from "../rulesets/rule-link";

export interface IFieldErrorProcessor
{    
    processRuleLink(model: any, fieldValue: any, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(model: any, fieldValue: any, rules: any): Promise<string>;
}