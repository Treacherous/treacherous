import { Ruleset } from "../rulesets/ruleset";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
import { IValidationGroupFactory } from "./ivalidation-group-factory";
import { IValidationGroup } from "../validation-groups/ivalidation-group";
import { IValidationSettings } from "../settings/ivalidation-settings";
export declare class ValidationGroupFactory implements IValidationGroupFactory {
    private fieldErrorProcessor;
    private ruleResolver;
    private defaultSettings;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, ruleResolver: IRuleResolver, defaultSettings: IValidationSettings);
    createValidationGroup: (model: any, ruleset: Ruleset, settings?: IValidationSettings) => IValidationGroup;
}
