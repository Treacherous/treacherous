import {ValidationGroup} from "../validation-group";
import {Ruleset} from "../rulesets/ruleset";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IValidationGroupFactory} from "./ivalidation-group-factory";
import {IValidationGroup} from "../ivalidation-group";
import {IValidationSettings} from "../settings/ivalidation-settings";

export class ValidationGroupFactory implements IValidationGroupFactory
{
    constructor(private fieldErrorProcessor: IFieldErrorProcessor, private ruleResolver: IRuleResolver, private defaultSettings: IValidationSettings){}

    public createValidationGroup = (model: any, ruleset: Ruleset, settings?:IValidationSettings) : IValidationGroup => {
        return new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, ruleset, model, settings || this.defaultSettings);
    }
}