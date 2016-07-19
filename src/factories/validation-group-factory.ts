import {ValidationGroup} from "../validation-group";
import {Ruleset} from "../rulesets/ruleset";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IModelWatcherFactory} from "./imodel-watcher-factory";
import {IValidationGroupFactory} from "./ivalidation-group-factory";
import {IValidationGroup} from "../ivalidation-group";

export class ValidationGroupFactory implements IValidationGroupFactory
{
    constructor(private fieldErrorProcessor: IFieldErrorProcessor, private modelWatcherFactory: IModelWatcherFactory, private propertyResolver: any, private ruleResolver: IRuleResolver){}

    public createValidationGroup = (model: any, ruleset: Ruleset) : IValidationGroup => {
        var modelWatcher = this.modelWatcherFactory.createModelWatcher();
        return new ValidationGroup(this.fieldErrorProcessor, modelWatcher, this.propertyResolver, this.ruleResolver, ruleset, model);
    }
}