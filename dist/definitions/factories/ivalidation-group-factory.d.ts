import { Ruleset } from "../rulesets/ruleset";
import { IValidationGroup } from "../ivalidation-group";
export interface IValidationGroupFactory {
    createValidationGroup(model: any, ruleset: Ruleset): IValidationGroup;
}
