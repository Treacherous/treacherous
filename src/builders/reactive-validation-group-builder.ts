import {Ruleset} from "../rulesets/ruleset";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IValidationSettings} from "../settings/ivalidation-settings";
import {IReactiveValidationGroup} from "../validation-groups/ireactive-validation-group";
import {ReactiveValidationGroup} from "../validation-groups/reactive-validation-group";

export class ReactiveValidationGroupBuilder
{
    private refreshRate: number;
    private validationSettings: IValidationSettings;
    private validateOnStart: boolean;

    constructor(private fieldErrorProcessor: FieldErrorProcessor,
                private ruleResolver: RuleResolver,
                private defaultValidationSettings: IValidationSettings) {}

    public create = (): ReactiveValidationGroupBuilder =>
    {
        this.refreshRate = 500;
        this.validateOnStart = false;
        this.validationSettings = this.defaultValidationSettings;
        return this;
    }

    public withRefreshRate = (refreshRate: number): ReactiveValidationGroupBuilder =>
    {
        this.refreshRate = refreshRate;
        return this;
    }

    public withValidationSettings = (validationSettings: IValidationSettings): ReactiveValidationGroupBuilder => {
        this.validationSettings = validationSettings;
        return this;
    }

    public andValidateOnStart = (): ReactiveValidationGroupBuilder =>
    {
        this.validateOnStart = true;
        return this;
    }

    public build = (model: any, ruleset: Ruleset): IReactiveValidationGroup =>
    {
        var validationGroup = new ReactiveValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.validationSettings, model, ruleset, this.refreshRate);

        if(this.validateOnStart)
        { validationGroup.validate(); }

        return validationGroup;
    }
}