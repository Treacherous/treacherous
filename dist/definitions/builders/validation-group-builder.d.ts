import { Ruleset } from "../rulesets/ruleset";
import { FieldErrorProcessor } from "../processors/field-error-processor";
import { RuleResolver } from "../rulesets/rule-resolver";
import { IValidationSettings } from "../settings/ivalidation-settings";
import { IValidationGroup } from "../validation-groups/ivalidation-group";
import { ReactiveValidationGroupBuilder } from "./reactive-validation-group-builder";
export declare class ValidationGroupBuilder {
    private fieldErrorProcessor;
    private ruleResolver;
    private defaultValidationSettings;
    private validationSettings;
    private validateOnStart;
    constructor(fieldErrorProcessor: FieldErrorProcessor, ruleResolver: RuleResolver, defaultValidationSettings: IValidationSettings);
    create: () => ValidationGroupBuilder;
    asReactiveGroup: () => ReactiveValidationGroupBuilder;
    withValidationSettings: (validationSettings: IValidationSettings) => ValidationGroupBuilder;
    andValidateOnStart: () => ValidationGroupBuilder;
    build: (model: any, ruleset: Ruleset) => IValidationGroup;
}
