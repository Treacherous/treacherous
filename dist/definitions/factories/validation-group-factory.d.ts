import { Ruleset } from "../rulesets/ruleset";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
import { IValidationGroupFactory } from "./ivalidation-group-factory";
import { IValidationGroup } from "../ivalidation-group";
import { IValidationSettings } from "../ivalidation-settings";
export declare class ValidationGroupFactory implements IValidationGroupFactory {
    private fieldErrorProcessor;
    private ruleResolver;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, ruleResolver: IRuleResolver);
    createValidationGroup: (model: any, ruleset: Ruleset, options: IValidationSettings) => IValidationGroup;
}
