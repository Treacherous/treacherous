import { ValidationGroup } from "../validation-groups/validation-group";
import { ReactiveValidationGroupBuilder } from "./reactive-validation-group-builder";
import { ModelResolverFactory } from "../factories/model-resolver-factory";
export class ValidationGroupBuilder {
    constructor(fieldErrorProcessor, ruleResolver, localeHandler) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.localeHandler = localeHandler;
        this.create = () => {
            this.modelResolverFactory = new ModelResolverFactory();
            this.validateOnStart = false;
            return this;
        };
        this.asReactiveGroup = () => {
            const reactiveBuilder = new ReactiveValidationGroupBuilder(this.fieldErrorProcessor, this.ruleResolver, this.localeHandler)
                .create()
                .withModelResolverFactory(this.modelResolverFactory);
            return reactiveBuilder;
        };
        this.withModelResolverFactory = (modelResolverFactory) => {
            this.modelResolverFactory = modelResolverFactory;
            return this;
        };
        this.andValidateOnStart = () => {
            this.validateOnStart = true;
            return this;
        };
        this.build = (model, ruleset) => {
            const validationGroup = new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, this.localeHandler, model, ruleset);
            if (this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
}
