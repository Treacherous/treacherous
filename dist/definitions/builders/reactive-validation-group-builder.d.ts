import { Ruleset } from "../rulesets/ruleset";
import { FieldErrorProcessor } from "../processors/field-error-processor";
import { RuleResolver } from "../rulesets/rule-resolver";
import { IReactiveValidationGroup } from "../validation-groups/ireactive-validation-group";
import { IModelResolverFactory } from "../factories/imodel-resolver-factory";
export declare class ReactiveValidationGroupBuilder {
    private fieldErrorProcessor;
    private ruleResolver;
    private refreshRate;
    private validateOnStart;
    private modelWatcherFactory;
    private modelResolverFactory;
    constructor(fieldErrorProcessor: FieldErrorProcessor, ruleResolver: RuleResolver);
    create: () => ReactiveValidationGroupBuilder;
    withRefreshRate: (refreshRate: number) => ReactiveValidationGroupBuilder;
    withModelResolverFactory: (modelResolverFactory: IModelResolverFactory) => ReactiveValidationGroupBuilder;
    andValidateOnStart: () => ReactiveValidationGroupBuilder;
    build: (model: any, ruleset: Ruleset) => IReactiveValidationGroup;
}
