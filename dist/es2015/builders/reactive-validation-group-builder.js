import { ReactiveValidationGroup } from "../validation-groups/reactive-validation-group";
import { ModelWatcherFactory } from "../factories/model-watcher-factory";
import { ModelResolverFactory } from "../factories/model-resolver-factory";
export class ReactiveValidationGroupBuilder {
    constructor(fieldErrorProcessor, ruleResolver, localeHandler) {
        this.fieldErrorProcessor = fieldErrorProcessor;
        this.ruleResolver = ruleResolver;
        this.localeHandler = localeHandler;
        this.create = () => {
            this.refreshRate = 500;
            this.validateOnStart = false;
            this.modelWatcherFactory = new ModelWatcherFactory();
            this.modelResolverFactory = new ModelResolverFactory();
            return this;
        };
        this.withRefreshRate = (refreshRate) => {
            this.refreshRate = refreshRate;
            return this;
        };
        this.withModelResolverFactory = (modelResolverFactory) => {
            this.modelResolverFactory = modelResolverFactory;
            return this;
        };
        this.withModelWatcherFactory = (modelWatcherFactory) => {
            this.modelWatcherFactory = modelWatcherFactory;
            return this;
        };
        this.andValidateOnStart = () => {
            this.validateOnStart = true;
            return this;
        };
        this.build = (model, ruleset) => {
            const validationGroup = new ReactiveValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, this.modelWatcherFactory, this.localeHandler, model, ruleset, this.refreshRate);
            if (this.validateOnStart) {
                validationGroup.validate();
            }
            return validationGroup;
        };
    }
}
