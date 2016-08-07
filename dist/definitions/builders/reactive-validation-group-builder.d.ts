import { Ruleset } from "../rulesets/ruleset";
import { FieldErrorProcessor } from "../processors/field-error-processor";
import { RuleResolver } from "../rulesets/rule-resolver";
import { IValidationSettings } from "../settings/ivalidation-settings";
import { IReactiveValidationGroup } from "../validation-groups/ireactive-validation-group";
export declare class ReactiveValidationGroupBuilder {
    private fieldErrorProcessor;
    private ruleResolver;
    private defaultValidationSettings;
    private refreshRate;
    private validationSettings;
    private validateOnStart;
    constructor(fieldErrorProcessor: FieldErrorProcessor, ruleResolver: RuleResolver, defaultValidationSettings: IValidationSettings);
    create: () => ReactiveValidationGroupBuilder;
    withRefreshRate: (refreshRate: number) => ReactiveValidationGroupBuilder;
    withValidationSettings: (validationSettings: IValidationSettings) => ReactiveValidationGroupBuilder;
    andValidateOnStart: () => ReactiveValidationGroupBuilder;
    build: (model: any, ruleset: Ruleset) => IReactiveValidationGroup;
}
