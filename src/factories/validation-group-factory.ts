import {ValidationGroup} from "../validation-group";
import {Ruleset} from "../rulesets/ruleset";
import {IModelWatcher} from "../watcher/imodel-watcher";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";

export class ValidationGroupFactory
{
    constructor(private fieldErrorProcessor: IFieldErrorProcessor, private modelWatcher: IModelWatcher, private propertyResolver: any, private ruleResolver: IRuleResolver){}

    public createValidationGroup = (model: any, ruleset: Ruleset) => {
        return new ValidationGroup(this.fieldErrorProcessor, this.modelWatcher, this.propertyResolver, this.ruleResolver, ruleset, model);
    }
}