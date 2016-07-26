import {ValidationGroup} from "../validation-group";
import {Ruleset} from "../rulesets/ruleset";
import {IRuleResolver} from "../rulesets/irule-resolver";
import {IFieldErrorProcessor} from "../processors/ifield-error-processor";
import {IModelWatcherFactory} from "./imodel-watcher-factory";
import {IValidationGroupFactory} from "./ivalidation-group-factory";
import {IValidationGroup} from "../ivalidation-group";
import {ValidationSettings, validationSettingsDefaults} from "../validation-settings";
import {ModelWatcher} from "../watcher/model-watcher";

export class ValidationGroupFactory implements IValidationGroupFactory
{
    constructor(private fieldErrorProcessor: IFieldErrorProcessor, private ruleResolver: IRuleResolver){}

    public createValidationGroup = (model: any, ruleset: Ruleset, options?:ValidationSettings) : IValidationGroup => {
        var _settings = Object.assign(validationSettingsDefaults, options || {})
        var modelWatcher = _settings.createModelWatcher();
        var propertyResolver = _settings.createPropertyResolver();
        return new ValidationGroup(this.fieldErrorProcessor, this.ruleResolver, ruleset, model, _settings);
    }
}