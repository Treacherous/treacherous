import {Ruleset} from "../rulesets/ruleset";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IReactiveValidationGroup} from "../validation-groups/ireactive-validation-group";
import {ReactiveValidationGroup} from "../validation-groups/reactive-validation-group";
import {IModelResolverFactory} from "../factories/imodel-resolver-factory";
import {IModelWatcherFactory} from "../factories/imodel-watcher-factory";
import {ModelWatcherFactory} from "../factories/model-watcher-factory";
import {ModelResolverFactory} from "../factories/model-resolver-factory";

export class ReactiveValidationGroupBuilder
{
    private refreshRate: number;
    private validateOnStart: boolean;
    private modelWatcherFactory: IModelWatcherFactory;
    private modelResolverFactory: IModelResolverFactory;

    constructor(private fieldErrorProcessor: FieldErrorProcessor,
                private ruleResolver: RuleResolver) {}

    public create = (): ReactiveValidationGroupBuilder =>
    {
        this.refreshRate = 500;
        this.validateOnStart = false;
        this.modelWatcherFactory = new ModelWatcherFactory();
        this.modelResolverFactory = new ModelResolverFactory();
        return this;
    }

    public withRefreshRate = (refreshRate: number): ReactiveValidationGroupBuilder =>
    {
        this.refreshRate = refreshRate;
        return this;
    }

    public withModelResolverFactory = (modelResolverFactory: IModelResolverFactory): ReactiveValidationGroupBuilder => {
        this.modelResolverFactory = modelResolverFactory;
        return this;
    }


    public andValidateOnStart = (): ReactiveValidationGroupBuilder =>
    {
        this.validateOnStart = true;
        return this;
    }

    public build = (model: any, ruleset: Ruleset): IReactiveValidationGroup =>
    {
        var validationGroup = new ReactiveValidationGroup(this.fieldErrorProcessor,
            this.ruleResolver, this.modelResolverFactory, this.modelWatcherFactory,
            model, ruleset, this.refreshRate);

        if(this.validateOnStart)
        { validationGroup.validate(); }

        return validationGroup;
    }
}