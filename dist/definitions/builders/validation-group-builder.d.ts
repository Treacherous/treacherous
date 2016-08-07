import { Ruleset } from "../rulesets/ruleset";
import { FieldErrorProcessor } from "../processors/field-error-processor";
import { RuleResolver } from "../rulesets/rule-resolver";
import { IValidationGroup } from "../validation-groups/ivalidation-group";
import { ReactiveValidationGroupBuilder } from "./reactive-validation-group-builder";
import { IModelResolverFactory } from "../factories/imodel-resolver-factory";
export declare class ValidationGroupBuilder {
    private fieldErrorProcessor;
    private ruleResolver;
    private modelResolverFactory;
    private validateOnStart;
    constructor(fieldErrorProcessor: FieldErrorProcessor, ruleResolver: RuleResolver);
    create: () => ValidationGroupBuilder;
    asReactiveGroup: () => ReactiveValidationGroupBuilder;
    withModelResolverFactory: (modelResolverFactory: IModelResolverFactory) => ValidationGroupBuilder;
    andValidateOnStart: () => ValidationGroupBuilder;
    build: (model: any, ruleset: Ruleset) => IValidationGroup;
}
