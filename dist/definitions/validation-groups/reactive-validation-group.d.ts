import { Ruleset } from "../rulesets/ruleset";
import { IModelWatcher } from "../watcher/imodel-watcher";
import { IFieldErrorProcessor } from "../processors/ifield-error-processor";
import { IRuleResolver } from "../rulesets/irule-resolver";
import { IReactiveValidationGroup } from "./ireactive-validation-group";
import { ValidationGroup } from "./validation-group";
import { IModelResolverFactory } from "../factories/imodel-resolver-factory";
import { IModelWatcherFactory } from "../factories/imodel-watcher-factory";
export declare class ReactiveValidationGroup extends ValidationGroup implements IReactiveValidationGroup {
    private modelWatcherFactory;
    private refreshRate;
    modelWatcher: IModelWatcher;
    constructor(fieldErrorProcessor: IFieldErrorProcessor, ruleResolver: IRuleResolver, modelResolverFactory: IModelResolverFactory, modelWatcherFactory: IModelWatcherFactory, model: any, ruleset: Ruleset, refreshRate?: number);
    private onModelChanged;
    release: () => void;
}
