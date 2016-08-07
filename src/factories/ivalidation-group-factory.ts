import {Ruleset} from "../rulesets/ruleset";
import {IValidationGroup} from "../validation-groups/ivalidation-group";

export interface IValidationGroupFactory
{
    createValidationGroup(model: any, ruleset: Ruleset): IValidationGroup;
}