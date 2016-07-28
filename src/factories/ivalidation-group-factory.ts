import {Ruleset} from "../rulesets/ruleset";
import {IValidationGroup} from "../ivalidation-group";
import {IValidationSettings} from "../ivalidation-settings";

export interface IValidationGroupFactory
{
    createValidationGroup(model: any, ruleset: Ruleset, options:IValidationSettings): IValidationGroup;
}