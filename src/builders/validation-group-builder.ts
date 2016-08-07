import {Ruleset} from "../rulesets/ruleset";
import {ValidationGroup} from "../validation-groups/validation-group";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IValidationGroup} from "../validation-groups/ivalidation-group";
import {ReactiveValidationGroupBuilder} from "./reactive-validation-group-builder";
import {IModelResolverFactory} from "../factories/imodel-resolver-factory";
import {ModelResolverFactory} from "../factories/model-resolver-factory";

export class ValidationGroupBuilder
{
    private modelResolverFactory: IModelResolverFactory;
    private validateOnStart: boolean;

    constructor(private fieldErrorProcessor: FieldErrorProcessor,
                private ruleResolver: RuleResolver) {}

    public create = (): ValidationGroupBuilder =>
    {
        this.modelResolverFactory = new ModelResolverFactory();
        this.validateOnStart = false;
        return this;
    }

    public asReactiveGroup = ():  ReactiveValidationGroupBuilder =>
    {
        var reactiveBuilder = new ReactiveValidationGroupBuilder(this.fieldErrorProcessor, this.ruleResolver)
            .create()
            .withModelResolverFactory(this.modelResolverFactory);

        return reactiveBuilder;
    }

    public withModelResolverFactory = (modelResolverFactory: IModelResolverFactory): ValidationGroupBuilder => {
        this.modelResolverFactory = modelResolverFactory;
        return this;
    }

    public andValidateOnStart = (): ValidationGroupBuilder =>
    {
        this.validateOnStart = true;
        return this;
    }

    public build = (model: any, ruleset: Ruleset): IValidationGroup =>
    {
        var validationGroup = new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.modelResolverFactory, model, ruleset);

        if(this.validateOnStart)
        { validationGroup.validate(); }

        return validationGroup;
    }
}