import * as Promise from "bluebird";
import { RuleLink } from "../rulesets/rule-link";
export interface IFieldErrorProcessor {
    processRuleLink(fieldValue: any, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(fieldValue: any, rules: any): Promise<string>;
}
