;
import {Ruleset} from "../rulesets/ruleset";
import {RuleRegistry} from "../rules/rule-registry";
import {RuleLink} from "../rulesets/rule-link";
import {ValidationError} from "./validation-error";
import {FieldHasError} from "./field-has-error";

export interface IFieldErrorProcessor
{    
    processRuleLink(fieldValue: any, ruleLink: RuleLink): Promise<any>;
    checkFieldForErrors(fieldValue: any, rules: any): Promise<string>;
}