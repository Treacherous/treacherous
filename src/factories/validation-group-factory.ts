import {ValidationGroup} from "../validation-group";
import {FieldErrorProcessor} from "../processors/field-error-processor";
import {Ruleset} from "../rulesets/ruleset";

export class ValidationGroupFactory
{
    constructor(private fieldErrorProcessor: FieldErrorProcessor){}

    public createValidationGroup = (model: any, ruleset: Ruleset) => {
        return new ValidationGroup(this.fieldErrorProcessor, ruleset, model);
    }
}