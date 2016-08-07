import {Ruleset} from "../rulesets/ruleset";
import {ValidationGroup} from "../validation-groups/validation-group";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {RuleResolver} from "../rulesets/rule-resolver";
import {IValidationSettings} from "../settings/ivalidation-settings";
import {IValidationGroup} from "../validation-groups/ivalidation-group";
import {ReactiveValidationGroupBuilder} from "./reactive-validation-group-builder";

export class ValidationGroupBuilder
{
    private validationSettings: IValidationSettings;
    private validateOnStart: boolean;

    constructor(private fieldErrorProcessor: FieldErrorProcessor,
                private ruleResolver: RuleResolver,
                private defaultValidationSettings: IValidationSettings) {}

    public create = (): ValidationGroupBuilder =>
    {
        this.validationSettings = this.defaultValidationSettings;
        this.validateOnStart = false;
        return this;
    }

    public asReactiveGroup = ():  ReactiveValidationGroupBuilder =>
    {
        var reactiveBuilder = new ReactiveValidationGroupBuilder(this.fieldErrorProcessor, this.ruleResolver, this.defaultValidationSettings)
            .create();

        if(this.validationSettings != this.defaultValidationSettings)
        { reactiveBuilder.withValidationSettings(this.validationSettings); }

        return reactiveBuilder;
    }

    public withValidationSettings = (validationSettings: IValidationSettings): ValidationGroupBuilder => {
        this.validationSettings = validationSettings;
        return this;
    }

    public andValidateOnStart = (): ValidationGroupBuilder =>
    {
        this.validateOnStart = true;
        return this;
    }

    public build = (model: any, ruleset: Ruleset): IValidationGroup =>
    {
        var validationGroup = new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, this.validationSettings, model, ruleset);

        if(this.validateOnStart)
        { validationGroup.validate(); }

        return validationGroup;
    }
}