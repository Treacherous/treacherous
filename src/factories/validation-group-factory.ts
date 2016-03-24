import {ValidationGroup} from "../validation-group";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {Ruleset} from "../rulesets/ruleset";
import {IModelWatcher} from "../watcher/imodel-watcher";

export class ValidationGroupFactory
{
    constructor(private fieldErrorProcessor: FieldErrorProcessor, private modelWatcher: IModelWatcher){}

    public createValidationGroup = (model: any, ruleset: Ruleset) => {
        return new ValidationGroup(this.fieldErrorProcessor, this.modelWatcher, ruleset, model);
    }
}