import { Ruleset } from "../rulesets/ruleset";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
import { IModelWatcherFactory } from "./imodel-watcher-factory";
import { IValidationGroupFactory } from "./ivalidation-group-factory";
import { IValidationGroup } from "../ivalidation-group";
export declare class ValidationGroupFactory implements IValidationGroupFactory {
    private fieldErrorProcessor;
    private modelWatcherFactory;
    private propertyResolver;
    private ruleResolver;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, modelWatcherFactory: IModelWatcherFactory, propertyResolver: any, ruleResolver: IRuleResolver);
    createValidationGroup: (model: any, ruleset: Ruleset) => IValidationGroup;
}
