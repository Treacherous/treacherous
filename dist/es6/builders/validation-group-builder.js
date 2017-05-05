import { ValidationGroup } from "../validation-groups/validation-group";
import { ReactiveValidationGroupBuilder } from "./reactive-validation-group-builder";
import { ModelResolverFactory } from "../factories/model-resolver-factory";
export class ValidationGroupBuilder {
    constructor(fieldErrorProcessor, ruleResolver) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.create = () => {
            this.modelResolverFactory = new ModelResolverFactory();
            this.validateOnStart = false;
            return this;
        };
        this.asReactiveGroup = () => {
            var reactiveBuilder = new ReactiveValidationGroupBuilder(this.fieldErrorProcessor, this.ruleResolver)
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
            var validationGroup = new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, model, ruleset);
            if (this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
}
