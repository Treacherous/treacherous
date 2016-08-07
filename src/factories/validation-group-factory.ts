import {ValidationGroup} from "../validation-groups/validation-group";
import {Ruleset} from "../rulesets/ruleset";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IValidationGroupFactory} from "./ivalidation-group-factory";
import {IValidationGroup} from "../validation-groups/ivalidation-group";
import {IValidationSettings} from "../settings/ivalidation-settings";
import {ReactiveValidationGroup} from "../validation-groups/reactive-validation-group";

export class ValidationGroupFactory implements IValidationGroupFactory
{
    constructor(private fieldErrorProcessor: IFieldErrorProcessor, private ruleResolver: IRuleResolver, private defaultSettings: IValidationSettings){}

    public createValidationGroup = (model: any, ruleset: Ruleset, settings?:IValidationSettings) : IValidationGroup => {
        return new ReactiveValidationGroup(this.fieldErrorProcessor, this.ruleResolver, settings || this.defaultSettings, model, ruleset);
    }
}