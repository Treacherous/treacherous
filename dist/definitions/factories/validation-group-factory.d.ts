import { ValidationGroup } from "../validation-group";
import { Ruleset } from "../rulesets/ruleset";
import { IModelWatcher } from "../watcher/imodel-watcher";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
export declare class ValidationGroupFactory {
    private fieldErrorProcessor;
    private modelWatcher;
    private propertyResolver;
    private ruleResolver;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, modelWatcher: IModelWatcher, propertyResolver: any, ruleResolver: IRuleResolver);
    createValidationGroup: (model: any, ruleset: Ruleset) => ValidationGroup;
}
