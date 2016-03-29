import * as Promise from "bluebird";
import { RuleRegistry } from "../rules/rule-registry";
import { RuleLink } from "../rulesets/rule-link";
export declare class FieldErrorProcessor {
    ruleRegistry: RuleRegistry;
    constructor(ruleRegistry: RuleRegistry);
    processRuleLink(fieldValue: any, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(fieldValue: any, rules: any): Promise<string>;
}
