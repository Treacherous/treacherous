import { ValidationGroup } from "../validation-group";
import { FieldErrorProcessor } from "../processors/field-error-processor";
import { Ruleset } from "../rulesets/ruleset";
import { IModelWatcher } from "../watcher/imodel-watcher";
export declare class ValidationGroupFactory {
    private fieldErrorProcessor;
    private modelWatcher;
    private propertyResolver;
    private ruleResolver;
    constructor(fieldErrorProcessor: FieldErrorProcessor, modelWatcher: IModelWatcher, propertyResolver: any, ruleResolver: any);
    createValidationGroup: (model: any, ruleset: Ruleset) => ValidationGroup;
}
